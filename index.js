const puppeteer = require('puppeteer')
const EventEmitter = require('eventemitter3')
const fs = require('fs')
const pMemoize = require('p-memoize')

// hm. for testing provide a way to have multiple browsers?

const getBrowser = pMemoize(startBrowser)

async function startBrowser () {
  return await puppeteer.launch()
}

function watcher (url, selector = 'body') {
  const w = new EventEmitter()
  start().then(() => {
    w.emit('running')
  })
  return w

  async function start () {
    const browser = await getBrowser()
    const page = await browser.newPage()

    w.close = async () => {
      w.running = false
      await page.close({runBeforeUnload: false})
    }

    w.running = true
    await page.goto(url)

    // pass along events?
    // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-page

    await page.evaluate('window.hpwSelector = ' + JSON.stringify(selector))
    
    await page.evaluate(() => {
      window.oldval = ''
      window.textRep = () => {
        // we make a text representation which is innerText + all the links
        // because we can are link URLs changing
        const arr = []
        const as = document.querySelectorAll('div a')
        for (let aa of as) arr.push(aa.getAttribute('href') + ' ' + aa.innerText)
        // arr.push(document.body.innerText)
        // doc specific, fragile
        arr.push(document.querySelector(window.hpwSelector).innerText)
        const t = arr.join('\n')
        // const t = JSON.stringify(arr)
        return t
      }
      window.ifChanged = () => {
        const n = window.textRep()
        if (n === window.oldval) return false
        window.oldval = n
        return n
      }
    })

    async function g () {
      const h = await page.waitForFunction("ifChanged()",
                                           {polling: 100,
                                            timeout: 10 * 60 * 1000})
      w.emit('change')
      if (w.running) g()
    }
    g()

    w.text = async () => {
      return await page.evaluate(() => {
        return window.oldval
      })
    }

    // in case you want to call w.page.evaluate yourself
    w.page = page
  }
}

module.exports = { watcher }
