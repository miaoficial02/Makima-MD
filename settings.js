import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"
import cheerio from "cheerio"
import fetch from "node-fetch"
import axios from "axios"
import moment from "moment-timezone"

globalThis.botNumber = ""

globalThis.owner = [
  ["5492916450307", "Owner 👑", true]
]

globalThis.dev = '© mᥲძᥱ ᥕі𝗍һ ᑲᥡ ᥲᥣᥱ᥊-᥊ ✌︎'
globalThis.jadi = 'BotJadiBot'
globalThis.sessions = 'BotSession'
globalThis.vs = '^1.0.0'
globalThis.api = 'https://api.stellarwa.xyz'

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright(`Update "${file}"`))
  import(`${file}?update=${Date.now()}`)
})