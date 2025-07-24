import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, args }) => {
  let stiker = false;

  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/webp|image|video/.test(mime)) {
      if (/video/.test(mime) && (q.msg || q).seconds > 15) {
        return m.reply('🏵️ El video no puede durar más de 15 segundos.');
      }

      let img = await q.download?.();
      if (!img) return conn.reply(m.chat, '🏵️ Envía una imagen o video para hacer un sticker.', m);

      let out;
      const texto1 = 'Mᴇᴍ 🧠 Cʜᴏ';
      const texto2 = await conn.getName(m.sender);

      try {
        stiker = await sticker(img, false, texto1, texto2);
      } catch (e) {
        console.error(e);
      } finally {
        if (!stiker) {
          if (/webp/.test(mime)) out = await webp2png(img);
          else if (/image/.test(mime)) out = await uploadImage(img);
          else if (/video/.test(mime)) out = await uploadFile(img);
          if (typeof out !== 'string') out = await uploadImage(img);
          stiker = await sticker(false, out, texto1, texto2);
        }
      }

    } else if (args[0]) {
      if (isUrl(args[0])) {
        const texto1 = 'Mᴇᴍ 🧠 Cʜᴏ';
        const texto2 = await conn.getName(m.sender);
        stiker = await sticker(false, args[0], texto1, texto2);
      } else {
        return m.reply('🏵️ El Link es incorrecto.');
      }
    }

  } catch (e) {
    // console.error(e);
    if (!stiker) stiker = e;
  } finally {
    if (stiker) {
      return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
    } else {
      return conn.reply(m.chat, '🏵️ Envía una imagen o video para hacer un sticker.', m);
    }
  }
};

handler.help = ['sticker <img|video|url>'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];

export default handler;

const isUrl = (text) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(text);
};