const {watcher} = require('.')
const opn = require('better-opn');

// This seems to work, but is slower than using the API, so never mind

// class new-tweets-bar ?
const sel = 'body' 

function f (url) {
  const w1 = watcher(url, sel)
  w1.on('running', () => { console.log('running', url) })
  w1.on('change', () => { console.log('\nchange', url) })

  w1.on('change', async () => {
    console.log('\nchange', 'text: ' + JSON.stringify(await w1.text())) })
  opn(url)
}

f('https://twitter.com/search?f=tweets&vertical=default&q=%23flextag&src=typd')

