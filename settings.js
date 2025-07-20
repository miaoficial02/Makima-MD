import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"

globalThis.botNumber = ""

globalThis.owner = [
  ["5492916450307", "Owner 👑", true]
]

globalThis.botname = 'Mem-Cho'
globalThis.dev = '•᷄‎ࡇ•᷅ ძᥱrᥱᥴһ᥆s rᥱsᥱr᥎ᥲძ᥆s ⍴᥆r ᥱᥣ ᥲᥙ𝗍һ᥆r'
globalThis.jadi = 'MemJadiBot'
globalThis.sessions = 'MemSession'

globalThis.api = { 
url: 'https://api.stellarwa.xyz',
apikey: 'Stellar'
}

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright(`Update "${file}"`))
  import(`${file}?update=${Date.now()}`)
})