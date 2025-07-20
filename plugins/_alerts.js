let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import fs from 'fs'
import path from 'path'

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {

if (!m.messageStubType || !m.isGroup) return
let chat = globalThis.db.data.chats[m.chat]
let userss = m.messageStubParameters[0]

let admingp, noadmingp
admingp = `@${userss.split('@')[0]} ha sido promovido a Administrador por @${m.sender.split('@')[0]}`
noadmingp =  `@${userss.split('@')[0]} ha sido degradado de Administrador por @${m.sender.split('@')[0]}`

if (chat.detect && m.messageStubType == 2) {
const uniqid = (m.isGroup ? m.chat : m.sender).split('@')[0]
const sessionPath = './MemSession/'
for (const file of await fs.readdir(sessionPath)) {
if (file.includes(uniqid)) {
await fs.unlink(path.join(sessionPath, file))
console.log(`${chalk.yellow.bold('✎ Delete!')} ${chalk.greenBright(`'${file}'`)}\n${chalk.redBright('Que provoca el "undefined" en el chat.')}`)
}}

} if (chat.alerts && m.messageStubType == 29) {
await conn.sendMessage(m.chat, { text: admingp, mentions: [userss, m.sender] }, { quoted: null })  

return;
} if (chat.alerts && m.messageStubType == 30) {
await conn.sendMessage(m.chat, { text: noadmingp, mentions: [userss, m.sender] }, { quoted: null })  

}}
export default handler