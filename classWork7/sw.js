navigator.serviceWorker.register('https://burakeless.github.io/Advanced-Programming/classWork7/sw.js')

const CACHE ='JS'
const FILES = ['https://burakeless.github.io/Advanced-Programming/classWork7/cw7.html']
function installCB(e) {
    e.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(FILES))
            .catch(console.log)
    )
}
self.addEventListener('install', installCB)

function save(req, resp) {
    return caches.open(CACHE)
        .then(cache => {
            cache.put(req, resp.clone());
            return resp;
        })
        .catch(console.log)
}
function fetchCB(e) { //fetch first
    let req = e.request
    e.respondWith(
        fetch(req).then(r2 => save(req, r2))
            .catch(() => { return caches.match(req).then(r1 => r1) })
    )
}
self.addEventListener('fetch', fetchCB)