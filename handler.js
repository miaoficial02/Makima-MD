import chalk from "chalk";
import Plugin from "./lib/plugins.js";
import serialize from "./lib/serialize.js";

export default async function handler(wss, m) {
    try {
        if (db?.data) {
            if (typeof db.data.users[m.sender] !== "object") {
                db.data.users[m.sender] = {
                    name: m.pushName,
                    userJid: m.sender,
                    level: 0,
                    exp: 0,
                    rank: "Novato",
                    lastActivity: 0,
                }
            } else {
                if (m.pushName && db.data.users[m.sender].name !== m.pushName) {
                    db.data.users[m.sender].name = m.pushName;
                }
                db.data.users[m.sender].exp += 10;
                db.data.users[m.sender].lastActivity = Date.now();
            }
            if (m.isGroup && typeof db.data.groups[m.chat] !== "object") {
                db.data.groups[m.chat] = {
                    antilink: false,
                    alerts: true,
                    welcome: true,
                }
            }
            if (!db.data.settings) {
                db.data.settings = {
                    grouponly: false,
                    privateonly: false,
                    commandsExecuted: 0,
                }
            } else {
                db.data.settings.commandsExecuted++;
            }
            await db.write();
        }
        if (!m.text) return;
        const body = m.text.trim().split(" ");
        const text = body.slice(1).join(" ");
        const args = body.slice(1);
        const usedPrefix = body[0].charAt(0);
        const plugin = Plugin.get(command);
        if (/^[/#]$/.test(usedPrefix) && plugin) {
            if (db.data.settings.grouponly && !m.isGroup) {
                return;
            }
            if (db.data.settings.privateonly && m.isGroup) {
                return;
            }

            if (plugin.flags.includes("isGroup") && !m.isGroup) {
                await wss.sendMessage(m.chat, { text: `- El comando *${usedPrefix + command}* solo puede ser ejecutado en grupos.`, mentions: [m.sender] }, { quoted: m });
                return;
            }
            if (plugin.flags.includes("isPrivate") && m.isGroup) {
                await wss.sendMessage(m.chat, { text: `- El comando *${usedPrefix + command}* solo puede ser ejecutado en el chat privado.`, mentions: [m.sender] }, { quoted: m });
                return;
            }
            try {
                await plugin.exec(wss, { m, text, args, command, usedPrefix, plugin, plugins: Plugin.plugins }); // agrega más valores dentro del { } según tus necesidades.
            } catch (error) {
                await wss.sendMessage(m.chat, { text: String(error), mentions: [m.sender] }, { quoted: m });
                return;
            }
        }
    } catch (error) {
        console.error(chalk.red(error));
    }
}