import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"

globalThis.botNumber = ""

globalThis.owner = [
  ["5492916450307", "Owner 👑", true]
]

globalThis.mods = []

globalThis.dev = '© mᥲძᥱ ᥕі𝗍һ ᑲᥡ ᥲᥣᥱ᥊-᥊ ✌︎'
globalThis.jadi = 'MemJadiBot'

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