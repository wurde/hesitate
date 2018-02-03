"use strict"

/**
 * Dependencies
 */

const puppeteer = require("puppeteer")
const hesitate = require("hesitate")

/**
 * Initialize browser
 */

const browser = await puppeteer.launch({ headless: false, timeout: 10000 })
const page = await browser.newPage()

/**
 * Example of hesitate method.
 */

await page.goto("https://www.google.com", { waitUntil: 'networkidle0' })
await hesitate(page) // hesitate a random number of ms between 300 and 1000.
await page.click('input[name="q"]')
await hesitate(page, { max: 2000, min: 1000 }) // hesitate 1000-2000 ms
await page.type('input[name="q"]', "MIT Technology Review", { delay: 20 })
await hesitate(page, { max: 4000, min: 2000 }) // hesitate 2000-4000 ms
await page.keyboard.press('Enter')
