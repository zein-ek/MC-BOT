const mineflayer = require('mineflayer')

// CHANGE THESE:
const SERVER_HOST = 'UNEARTHED-cPZO.aternos.me'
const SERVER_PORT = 49899
const BOT_USERNAME = 'AFK_Bot'
const BOT_PASSWORD = 'password'  // for LoginTo plugin

function createBot() {
  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: BOT_USERNAME
  })

  bot.on('spawn', () => {
    console.log('Bot joined the server!')

    // Register first time
    setTimeout(() => {
      bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`)
      bot.chat(`/login ${BOT_PASSWORD}`)
    }, 3000)

    // Random small movement to avoid AFK kick
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 30000)
  })

  bot.on('error', (err) => {
    console.log('Error:', err)
  })

  bot.on('end', () => {
    console.log('Bot disconnected, reconnecting in 30s...')
    setTimeout(createBot, 30000)
  })
}

createBot()
// --- Keep-alive ping server for Render ---
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Bot is alive!'))

app.listen(PORT, () => {
  console.log(`Ping server running on port ${PORT}`)
})
