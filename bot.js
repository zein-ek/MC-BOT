const mineflayer = require('mineflayer')

// ===== CONFIG =====
const SERVER_HOST = 'unearthed-smp.aternos.me:49899'
const SERVER_PORT = 49899
const BOT_PASSWORD = 'bot123'

// Add as many bots as you want here
const BOT_USERNAMES = [
  'AFK_Bot1',
  'AFK_Bot2',
  'AFK_Bot3'
]

// ===== BOT FUNCTION =====
function createBot(username) {
  console.log(`Starting bot: ${username}`)

  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: username
  })

  bot.on('spawn', () => {
    console.log(`${username} joined`)

    // Register + login
    setTimeout(() => {
      bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`)
    }, 2000)

    setTimeout(() => {
      bot.chat(`/login ${BOT_PASSWORD}`)
    }, 4000)

    // Anti-AFK movement
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 30000)
  })

  bot.on('end', () => {
    console.log(`${username} disconnected. Reconnecting...`)
    setTimeout(() => createBot(username), 2000)
  })

  bot.on('error', (err) => {
    console.log(`${username} error:`, err.message)
  })
}

// ===== START ALL BOTS (staggered) =====
BOT_USERNAMES.forEach((name, index) => {
  setTimeout(() => {
    createBot(name)
  }, index * 5000) // 5s delay between each bot
})

// ===== EXPRESS KEEP-ALIVE (RENDER) =====
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Bots are running!')
})

app.listen(PORT, () => {
  console.log(`Keep-alive server running on port ${PORT}`)
})
