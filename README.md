# headless-page-watcher
[![NPM version][npm-image]][npm-url]

Monitor a live web page for changes using a headless browser

---

This is a work-around. I want to be able to use Google Docs as live
data sources for software. Unfortunately, Google's drive.files.watch
API, using webhooks, does not track changes closely. When someone
opens the watched document and starts typing, the first two changes
get propogated quickly, then no more for a long long time.

So here, instead, we open the doc in a headless browser and watch the
DOM for changes. It's fast, at least. But obviously uses a ton of
resources to have the headless browser process sitting there. Probably
better to just poll the HTML view of the document, for most
applications.

---

In theory, this should work for any live pages, not just Google Docs,
but I haven't tested others.

[npm-image]: https://img.shields.io/npm/v/headless-page-watcher.svg?style=flat-square
[npm-url]: https://npmjs.org/package/headless-page-watcher
