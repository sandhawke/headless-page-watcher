const {watcher} = require('.')
const opn = require('better-opn');

function f (url) {
  const w1 = watcher(url)
  w1.on('change', () => { console.log('change', url) })
  w1.on('running', () => { console.log('running', url) })
  opn(url)
}

f('https://docs.google.com/document/d/1qHIRo20PXCiarGXwAdlocDPyk2ub83rSXHlfHGFZ1eA/edit?usp=sharing')

f('https://docs.google.com/document/d/1NajuGU8pC29bDyL9eYWUrW-8E2rBr2t7DthBUiRr1dU/edit')
