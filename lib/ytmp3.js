import axios from 'axios'
import * as cheerio from 'cheerio'

function extractVideoId(url) {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
  return match ? match[1] : null
}

export async function ytmp3(url) {
  if (!url) throw 'Masukkan URL YouTube!'

  const videoId = extractVideoId(url)
  const thumbnail = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null

  try {
    const form = new URLSearchParams()
    form.append('q', url)
    form.append('type', 'mp3')

    const res = await axios.post('https://yt1s.click/search', form.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://yt1s.click',
        'Referer': 'https://yt1s.click/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    })

    const $ = cheerio.load(res.data)
    const link = $('a[href*="download"]').attr('href')

    if (link) {
      return {
        link,
        title: $('title').text().trim() || 'Unknown Title',
        thumbnail,
        filesize: null,
        duration: null,
        success: true
      }
    }
  } catch (e) {
    console.warn('Gagal YT1S:', e.message || e.toString())
  }


  try {
    if (!videoId) throw 'Video ID tidak valid'

    const payload = {
      fileType: 'MP3',
      id: videoId
    }

    const res = await axios.post('https://ht.flvto.online/converter', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://ht.flvto.online',
        'Referer': `https://ht.flvto.online/widget?url=https://www.youtube.com/watch?v=${videoId}`,
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13)',
      },
    })

    const data = res?.data
    if (!data || typeof data !== 'object') {
      throw 'ga ada respon'
    }

    if (data.status !== 'ok' || !data.link) {
      throw `Status gagal: ${data.msg || 'Tidak diketahui'}`
    }

    return {
      link: data.link,
      title: data.title,
      thumbnail,
      filesize: data.filesize,
      duration: data.duration,
      success: true
    }

  } catch (e) {
    console.warn('Gagal FLVTO:', e.message || e.toString())
  }

  throw 'No se encontró un enlace de descarga.'
}

export default ytmp3