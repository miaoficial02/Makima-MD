import { makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } from "@whiskeysockets/baileys";
import cfonts from "cfonts";
import pino from "pino";
import { Boom } from "@hapi/boom";
import chalk from "chalk";
import { promises as fs } from "node:fs";
import path from "node:path";
import qrcodeTerminal from "qrcode-terminal";
import Plugin from "./lib/plugins.js";
import serialize from "./lib/serialize.js";
import handler from "./handler.js";
import { JSONFilePreset } from "lowdb/node";
const sessionFolder = path.join("SanSessions");

console.log(chalk.green.bold("Iniciando..."));

cfonts.say("Senko", {
    font: "block",
    align: "center",
    gradient: ["blue", "green"]
});
cfonts.say("desarrollado por ofcking", {
    font: "console",
    align: "center",
    color: "cyan"
});

globalThis.db = await JSONFilePreset("database.json", {
    users: {},
    groups: {},
    settings: {},
});
await db.read();
console.log(chalk.green("Base de datos iniciada corréctamente."));

await Plugin.load();
new Plugin();
await start();

async function start() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);

    const wss = makeWASocket({
        markOnlineOnConnect: true,
        defaultQueryTimeoutMs: undefined,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(
                state.keys,
                pino({
                    level: "silent",
                }).child({
                    level: "silent",
                }),
            ),
        },
        logger: pino({
            level: "silent",
        }),
        browser: ["Ubuntu", "Edge", "131.0.2903.86"],
        connectTimeoutMs: 1000 * 60,
        qrTimeout: 1000 * 60,
        syncFullHistory: false,
        printQRInTerminal: false,
        patchMessageBeforeSending: async (message) => {
            try {
                await wss.uploadPreKeysToServerIfRequired();
            } catch (err) {
                console.warn(err);
            }
            return message;
        },
        generateHighQualityLinkPreview: true,
        version,
    });

    console.info = () => { };
    console.debug = () => { };

    wss.ev.on("creds.update", saveCreds);
    wss.ev.on("connection.update", async ({ lastDisconnect, qr, connection }) => {
        if (qr) {
            console.log(chalk.green.bold(`
╭───────────────────╼
│ ${chalk.cyan("Escanea este código QR para conectarte.")}
╰───────────────────╼`));
            qrcodeTerminal.generate(qr, {
                small: true,
            });
        }
        if (connection === "close") {
            const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
            switch (code) {
                case DisconnectReason.loggedOut: // Significa que la sesión se cerró en el dispositivo.
                case DisconnectReason.badSession: // Significa que la sesión está corructa.
                case DisconnectReason.forbidden: // Significa que el bot ya no tiene autorización para volver a conectarse.
                case DisconnectReason.multideviceMismatch: // Significa que hay varias sesiones abiertas y no están bien coordinadas.
                    console.log(chalk.red.bold(`
╭───────────────────╼
│ ${chalk.yellow("La sesión se cerró sin posibilidades de reconexión.")}
╰───────────────────╼`));
                    console.log(JSON.stringify(lastDisconnect, null, 2));
                    await fs.rm(sessionFolder, { recursive: true, force: true }).catch(() => void 0);
                    process.exit(1);
                default:
                    console.log(chalk.red.bold(`
╭───────────────────╼
│ ${chalk.yellow(`La sesión se cerró con el código de estado "${chalk.white(code)}", reconéctando.`)}
╰───────────────────╼`));
                    await start();
                    break;
            }
        }
        if (connection === "open") {
            const userJid = jidNormalizedUser(wss.user.id);
            const userName = wss.user.name || wss.user.verifiedName || "Desconocido";
            console.log(chalk.green.bold(`
╭───────────────────╼
│ ${chalk.cyan("Conéctado con éxito")}
│
│- ${chalk.cyan("Bot :")} +${chalk.white(userJid.split("@")[0] + " - " + userName)}; 
│- ${chalk.cyan("Versión de WhatsApp :")} ${chalk.white(version)} 
╰───────────────────╼`));
        }
    });

    wss.ev.on("messages.upsert", async ({ messages, type }) => {
        if (type === "notify" && messages && messages.length !== 0) {
            for (const message of messages) {
                const m = serialize(message, wss);

                if (m && !/(@newsletter$|@lib$)|^status@broadcast$/.test(m.sender)) {
                    console.log(chalk.green.bold(`
╭─────────< Senko San - WhatsApp Bot >──────────╼
│ ${chalk.cyan(`Mensaje recibido`)}
│
│- ${chalk.cyan("Chat :")} ${chalk.white(m.chat)}
│- ${chalk.cyan("Usuario :")} +${chalk.white(m.sender.split("@")[0] + " - " + m.pushName)}
│- ${chalk.cyan("Tipo :")} ${chalk.white(m.type)};
╰╼
${chalk.whiteBright(m.text)}`));
                    handler(wss, m);
                }

            }
        }
    });
}