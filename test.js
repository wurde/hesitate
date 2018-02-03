"use strict"

/**
 * Dependencies
 */

const pussy = require('pussy')
const puppeteer = require("puppeteer")
const hesitate = require("./index")

/**
 * Initialize the bot.
 */

const query_bot = new pussy.Bot('query')

/**
 * Initialize Action
 */

const query_action = new pussy.Action('query')

/**
 * Define Action
 */

// Start browser.
query_action.activities[0] = async (args) => {
  args.browser = await puppeteer.launch({ headless: false, timeout: 10000 })
  args.page = await args.browser.newPage()
  await args.page.setViewport({ width: 960, height: 824 })
  return args
}

// Send query.
query_action.activities[1] = async (args) => {
  await args.page.goto("https://www.google.com", { waitUntil: 'networkidle0' })
  await hesitate(args.page) // hesitate a random number of ms between 300 and 1000.
  await args.page.click('input[name="q"]')
  await hesitate(args.page, { max: 2000, min: 1000 }) // hesitate 1000-2000 ms
  await args.page.type('input[name="q"]', args.q, { delay: 20 })
  await hesitate(args.page, { max: 4000, min: 2000 }) // hesitate 2000-4000 ms
  await args.page.keyboard.press('Enter')
  await hesitate(args.page, { max: 10000, min: 8000 }) // hesitate 8000-10000 ms
  return args
}

// Close the browser.
query_action.activities[2] = async (args) => {
  await args.page.close()
  await args.browser.close()
  return args
}

/**
 * Teach bot
 */

query_bot.learn(query_action)

/**
 * Send query
 */

query_bot.begin('query', { q: "MIT Technology Review" })
.catch((err) => {
  throw Error(err)
})
