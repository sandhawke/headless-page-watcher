const {watcher} = require('.')
const opn = require('better-opn');

const sel = 'div[guidedhelpid=docs_editing_area]'

function f (url) {
  const w1 = watcher(url, sel)
  w1.on('running', () => { console.log('running', url) })
  w1.on('change', () => { console.log('\nchange', url) })

  w1.on('change', async () => {
    console.log('\nchange', 'text: ' + JSON.stringify(await w1.text())) })
  opn(url)
}

f('https://docs.google.com/document/d/1qHIRo20PXCiarGXwAdlocDPyk2ub83rSXHlfHGFZ1eA/edit?usp=sharing')

f('https://docs.google.com/document/d/1NajuGU8pC29bDyL9eYWUrW-8E2rBr2t7DthBUiRr1dU/edit')
