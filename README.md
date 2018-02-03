# hesitate

Human-like delay between page interactions.

## Getting started

Add the package to your project using the npm ecosystem:

```bash
$ npm install hesitate --save
```

```javascript
const puppeteer = require("puppeteer")
const hesitate = require("hesitate")

const browser = await puppeteer.launch({ headless: true, timeout: 10000 })
const page = await browser.newPage()

await page.goto("https://www.google.com", { waitUntil: 'networkidle0' })
await hesitate(page) // hesitate a random number of ms between 300 and 1000.
await page.click('input[name="q"]')
await hesitate(page, { max: 2000, min: 1000 }) // hesitate 1000-2000 ms
await page.type('input[name="q"]', "MIT Technology Review", { delay: 20 })
await hesitate(page, { max: 4000, min: 2000 }) // hesitate 2000-4000 ms
await page.keyboard.press('Enter')
```

## Changelog

Get the project's history in [CHANGELOG.md](CHANGELOG.md).

## Maintainer

Andy Bettisworth <andy@accreu.com> https://andybettisworth.com

## License

This project is released under the [MIT License](LICENSE.txt).
