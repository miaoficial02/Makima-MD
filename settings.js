import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"
import cheerio from "cheerio"
import fetch from "node-fetch"
import axios from "axios"
import moment from "moment-timezone"

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
globalThis.botNumber = "" //Ejemplo: +573218138672

globalThis.owner = [
  ["573012482597", "Creador 👑", true]
]

globalThis.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ ᥲᥣᥱ᥊-᥊ ✌︎'
globalThis.botname = 'Senko San'
globalThis.jadi = 'SanJadiBot'
globalThis.sessions = 'SanSession'
globalThis.vs = '^1.0.0'
globalThis.sanJadibts = true

globalThis.gp1 = "https://chat.whatsapp.com/GkuIuySiMwb4qJGl3UJtcZ"
globalThis.channel = "https://whatsapp.com/channel/0029VaQD7LAJP216tu9liI2A"

globalThis.estilo = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount: -999999, status: 1, surface: 1, message: "❀ sᥙ́⍴ᥱr ᥕһᥲ𝗍sᥲ⍴⍴ ᑲ᥆𝗍 ☄︎", orderTitle: "Bang", thumbnailUrl: globalThis.catalogo, sellerJid: "0@s.whatsapp.net" } } }

globalThis.cheerio = cheerio
globalThis.fs = fs
globalThis.fetch = fetch
globalThis.axios = axios
globalThis.moment = moment

globalThis.multiplier = 69
globalThis.maxwarn = "3"

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright(`Update "${file}"`))
  import(`${file}?update=${Date.now()}`)
})