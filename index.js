process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './settings.js'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import {createRequire} from 'module'
import {fileURLToPath, pathToFileURL} from 'url'
import {platform} from 'process'
import * as ws from 'ws'
import fs, {readdirSync, statSync, unlinkSync, existsSync, mkdirSync, readFileSync, rmSync, watch} from 'fs'
import yargs from 'yargs';
import {spawn} from 'child_process'
import lodash from 'lodash'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import {tmpdir} from 'os'
import {format} from 'util'
import boxen from 'boxen'
import P from 'pino'
import pino from 'pino'
import Pino from 'pino'
import path, { join, dirname } from 'path'
import {Boom} from '@hapi/boom'
import {makeWASocket, protoType, serialize} from './lib/simple.js'
import {Low, JSONFile} from 'lowdb'
import {mongoDB, mongoDBV2} from './lib/mongoDB.js'
import store from './lib/store.js'
const {proto} = (await import('@whiskeysockets/baileys')).default
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const {DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser} = await import('@whiskeysockets/baileys')
import readline, { createInterface } from 'readline'
import NodeCache from 'node-cache'
const {CONNECTING} = ws
const {chain} = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

//const wa = dirname(fileURLToPath(import.meta.url))
//let require = createRequire(wa)
let { say } = cfonts

console.log(chalk.bold.redBright(`\nIniciando...\n`))

say("Senko", {
    font: "block",
    align: "center",
    gradient: ["blue", "green"]
});
say("Desarrollado Por Alex-X", {
    font: "console",
    align: "center",
    color: "cyan"
});

protoType()
serialize()

globalThis.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; global.__dirname = function dirname(pathURL) {
return path.dirname(globalThis.__filename(pathURL, true))
}; globalThis.__require = function require(dir = import.meta.url) {
return createRequire(dir)
}

globalThis.API = (name, path = '/', query = {}, apikeyqueryname) => (name in globalThis.APIs ? globalThis.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: globalThis.APIKeys[name in globalThis.APIs ? globalThis.APIs[name] : name]} : {})})) : '');

globalThis.timestamp = {start: new Date}

const __dirname = globalThis.__dirname(import.meta.url)

globalThis.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
globalThis.prefix = new RegExp('^[#!/]')
// globalThis.opts['db'] = process.env['db']

globalThis.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('database.json'))

globalThis.DATABASE = globalThis.db 
globalThis.loadDatabase = async function loadDatabase() {
if (globalThis.db.READ) {
return new Promise((resolve) => setInterval(async function() {
if (!globalThis.db.READ) {
clearInterval(this)
resolve(globalThis.db.data == null ? globalThis.loadDatabase() : globalThis.db.data);
}}, 1 * 1000))
}
if (globalThis.db.data !== null) return
globalThis.db.READ = true
await globalThis.db.read().catch(console.error)
globalThis.db.READ = null
globalThis.db.data = {
users: {},
chats: {},
stats: {},
msgs: {},
sticker: {},
sockets: {},
settings: {},
...(globalThis.db.data || {}),
}
globalThis.db.chain = chain(globalThis.db.data)
}
loadDatabase().catch((err) => {
    console.error("Error al cargar la Base de Datos:", err)
})

const {state, saveState, saveCreds} = await useMultiFileAuthState(globalThis.sessions)
const msgRetryCounterMap = (MessageRetryMap) => { };
const msgRetryCounterCache = new NodeCache()
const { version } = await fetchLatestBaileysVersion();
let phoneNumber = globalThis.botNumber

const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
const colors = chalk.bold.white
const qrOption = chalk.blueBright
const textOption = chalk.cyan
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

let opcion
if (methodCodeQR) {
opcion = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${sessions}/creds.json`)) {
do {
        opcion = await question(colors("Seleccione una opción:\n") + qrOption("1. Con código QR\n") + textOption("2. Con código de texto de 8 dígitos\n--> "))

if (!/^[1-2]$/.test(opcion)) {
console.log(chalk.bold.redBright(`No se permiten numeros que no sean 1 o 2, tampoco letras o símbolos especiales.`))
}} while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${sessions}/creds.json`))
} 

const connectionOptions = {
    logger: pino({ level: "silent" }),
    printQRInTerminal: opcion == "1" ? true : methodCodeQR ? true : false,
    mobile: MethodMobile,
    browser: ["Ubuntu", "Edge", "131.0.2903.86"],
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
    },
    markOnlineOnConnect: true,
    defaultQueryTimeoutMs: undefined,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
        const jid = jidNormalizedUser(key.remoteJid)
        const msg = await store.loadMessage(jid, key.id)
        return msg?.message || ""
    },
    msgRetryCounterCache,
    msgRetryCounterMap,
    defaultQueryTimeoutMs: undefined,
    version,
}

    console.info = () => { }
    console.debug = () => { }

globalThis.conn = makeWASocket(connectionOptions);

if (!fs.existsSync(`./${sessions}/creds.json`)) {
if (opcion === '2' || methodCode) {
opcion = '2'
if (!conn.authState.creds.registered) {
let addNumber
if (!!phoneNumber) {
addNumber = phoneNumber.replace(/[^0-9]/g, '')
} else {
do {
phoneNumber = await question(chalk.bgBlack(chalk.bold.greenBright(`🚩 Por favor, Ingrese el número de WhatsApp.\n${chalk.bold.yellowBright(`☁️  Ejemplo: 57321×××××××`)}\n${chalk.bold.magentaBright('---> ')}`)))
phoneNumber = phoneNumber.replace(/\D/g,'')
if (!phoneNumber.startsWith('+')) {
phoneNumber = `+${phoneNumber}`
}
} while (!await isValidPhoneNumber(phoneNumber))
rl.close()
addNumber = phoneNumber.replace(/\D/g, '')
setTimeout(async () => {
let codeBot = await conn.requestPairingCode(addNumber)
codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
console.log(chalk.bold.white(chalk.bgMagenta(`👑 CÓDIGO DE VINCULACIÓN 👑`)), chalk.bold.white(chalk.white(codeBot)))
}, 3000)
}}}
}

conn.isInit = false;
conn.well = false;
//conn.logger.info(`🔵  H E C H O\n`)

if (!opts['test']) {
if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])));
}, 30 * 1000);
}

//if (opts['server']) (await import('./server.js')).default(global.conn, PORT);

async function connectionUpdate(update) {
const {connection, lastDisconnect, isNewLogin} = update;
global.stopped = connection;
if (isNewLogin) conn.isInit = true;
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
await globalThis.reloadHandler(true).catch(console.error);
globalThis.timestamp.connect = new Date;
}
if (globalThis.db.data == null) loadDatabase();
if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
if (opcion == '1' || methodCodeQR) {
console.log(chalk.green.bold(`
╭───────────────────╼
│ ${chalk.cyan("Escanea este código QR para conectarte.")}
╰───────────────────╼`))}
}
        if (connection === "open") {
            const userJid = jidNormalizedUser(conn.user.id)
            const userName = conn.user.name || conn.user.verifiedName || "Desconocido"
            console.log(chalk.green.bold(`
╭───────────────────╼
│ ${chalk.cyan("Conéctado con éxito")}
│
│- ${chalk.cyan("Usuario :")} +${chalk.white(userJid.split("@")[0] + " - " + userName)}
│- ${chalk.cyan("Versión de WhatsApp :")} ${chalk.white(version)}
╰───────────────────╼`))
        }
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
if (connection === 'close') {
if (reason === DisconnectReason.badSession) {
console.log(chalk.bold.cyanBright(`\n⚠️ SIN CONEXIÓN, BORRE LA CARPETA ${global.sessions} Y ESCANEA EL CÓDIGO QR ⚠️`))
} else if (reason === DisconnectReason.connectionClosed) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹\n┆ ⚠️ CONEXION CERRADA, RECONECTANDO....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹`))
await globalThis.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionLost) {
console.log(chalk.bold.blueBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂\n┆ ⚠️ CONEXIÓN PERDIDA CON EL SERVIDOR, RECONECTANDO....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂`))
await globalThis.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(chalk.bold.yellowBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗\n┆ ⚠️ CONEXIÓN REEMPLAZADA, SE HA ABIERTO OTRA NUEVA SESION, POR FAVOR, CIERRA LA SESIÓN ACTUAL PRIMERO.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗`))
} else if (reason === DisconnectReason.loggedOut) {
console.log(chalk.bold.redBright(`\n⚠️ SIN CONEXIÓN, BORRE LA CARPETA ${global.sessions} Y ESCANEA EL CÓDIGO QR ⚠️`))
await globalThis.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.restartRequired) {
console.log(chalk.bold.cyanBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓\n┆ ❇️ CONECTANDO AL SERVIDOR...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓`))
await globalThis.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.timedOut) {
console.log(chalk.bold.yellowBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸\n┆ ⌛ TIEMPO DE CONEXIÓN AGOTADO, RECONECTANDO....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸`))
await globalThis.reloadHandler(true).catch(console.error) //process.send('reset')
} else {
console.log(chalk.bold.redBright(`\n⚠️❗ RAZON DE DESCONEXIÓN DESCONOCIDA: ${reason || 'No encontrado'} >> ${connection || 'No encontrado'}`))
}}
}
process.on('uncaughtException', console.error)

let isInit = true;
let handler = await import('./handler.js')
globalThis.reloadHandler = async function(restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error(e);
}
if (restatConn) {
const oldChats = globalThis.conn.chats
try {
globalThis.conn.ws.close()
} catch { }
conn.ev.removeAllListeners()
globalThis.conn = makeWASocket(connectionOptions, {chats: oldChats})
isInit = true
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}

conn.handler = handler.handler.bind(globalThis.conn)
conn.connectionUpdate = connectionUpdate.bind(globalThis.conn)
conn.credsUpdate = saveCreds.bind(globalThis.conn, true)

const currentDateTime = new Date()
const messageDateTime = new Date(conn.ev)
if (currentDateTime >= messageDateTime) {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0])

} else {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0])
}

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
};

const pluginFolder = globalThis.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = (filename) => /\.js$/.test(filename)
globalThis.plugins = {}
async function filesInit() {
for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
try {
const file = global.__filename(join(pluginFolder, filename))
const module = await import(file)
globalThis.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(e)
delete globalThis.plugins[filename]
}}}
filesInit().then((_) => Object.keys(globalThis.plugins)).catch(console.error);

globalThis.reload = async (_ev, filename) => {
if (pluginFilter(filename)) {
const dir = globalThis.__filename(join(pluginFolder, filename), true);
if (filename in globalThis.plugins) {
if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`)
else {
conn.logger.warn(`deleted plugin - '${filename}'`)
return delete globalThis.plugins[filename]
}} else conn.logger.info(`new plugin - '${filename}'`);
const err = syntaxerror(readFileSync(dir), filename, {
sourceType: 'module',
allowAwaitOutsideFunction: true,
});
if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
else {
try {
const module = (await import(`${globalThis.__filename(dir)}?update=${Date.now()}`));
globalThis.plugins[filename] = module.default || module;
} catch (e) {
conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
} finally {
globalThis.plugins = Object.fromEntries(Object.entries(globalThis.plugins).sort(([a], [b]) => a.localeCompare(b)))
}}
}}
Object.freeze(globalThis.reload)
watch(pluginFolder, globalThis.reload)
await globalThis.reloadHandler()
async function _quickTest() {
const test = await Promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version']),
].map((p) => {
return Promise.race([
new Promise((resolve) => {
p.on('close', (code) => {
resolve(code !== 127);
});
}),
new Promise((resolve) => {
p.on('error', (_) => resolve(false));
})]);
}));
const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
const s = global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find};
Object.freeze(globalThis.support);
}

function clearTmp() {
const tmpDir = join(__dirname, 'tmp')
const filenames = readdirSync(tmpDir)
filenames.forEach(file => {
const filePath = join(tmpDir, file)
unlinkSync(filePath)})
}

function purgeSession() {
let prekey = []
let directorio = readdirSync(`./${sessions}`)
let filesFolderPreKeys = directorio.filter(file => {
return file.startsWith('pre-key-')
})
prekey = [...prekey, ...filesFolderPreKeys]
filesFolderPreKeys.forEach(files => {
unlinkSync(`./${sessions}/${files}`)
})
} 

l
function purgeOldFiles() {
const directories = [`./${sessions}/`]
directories.forEach(dir => {
readdirSync(dir, (err, files) => {
if (err) throw err
files.forEach(file => {
if (file !== 'creds.json') {
const filePath = path.join(dir, file);
unlinkSync(filePath, err => {
if (err) {
console.log(chalk.bold.red(`\n╭» 🔴 ARCHIVO 🔴\n│→ ${file} NO SE LOGRÓ BORRAR\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️❌\n` + err))
} else {
console.log(chalk.bold.green(`\n╭» 🟣 ARCHIVO 🟣\n│→ ${file} BORRADO CON ÉXITO\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))
} }) }
}) }) }) }

function redefineConsoleMethod(methodName, filterStrings) {
const originalConsoleMethod = console[methodName]
console[methodName] = function() {
const message = arguments[0]
if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
arguments[0] = ""
}
originalConsoleMethod.apply(console, arguments)
}}

setInterval(async () => {
if (stopped === 'close' || !conn || !conn.user) return
await clearTmp()
console.log(chalk.bold.cyanBright(`\n╭» 🟢 MULTIMEDIA 🟢\n│→ ARCHIVOS DE LA CARPETA TMP ELIMINADAS\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))}, 1000 * 60 * 4) // 4 min 

setInterval(async () => {
if (stopped === 'close' || !conn || !conn.user) return
await purgeSession()
console.log(chalk.bold.cyanBright(`\n╭» 🔵 ${global.sessions} 🔵\n│→ SESIONES NO ESENCIALES ELIMINADAS\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))}, 1000 * 60 * 10) // 10 min

setInterval(async () => {
if (stopped === 'close' || !conn || !conn.user) return
await purgeSessionSB()}, 1000 * 60 * 10) 

setInterval(async () => {
if (stopped === 'close' || !conn || !conn.user) return
await purgeOldFiles()
console.log(chalk.bold.cyanBright(`\n╭» 🟠 ARCHIVOS 🟠\n│→ ARCHIVOS RESIDUALES ELIMINADAS\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))}, 1000 * 60 * 10)

_quickTest().then(() => conn.logger.info(chalk.bold(`🔵  H E C H O\n`.trim()))).catch(console.error)

async function isValidPhoneNumber(number) {
try {
number = number.replace(/\s+/g, '')
if (number.startsWith('+521')) {
number = number.replace('+521', '+52');
} else if (number.startsWith('+52') && number[4] === '1') {
number = number.replace('+52 1', '+52');
}
const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
return phoneUtil.isValidNumber(parsedNumber)
} catch (error) {
return false
}}