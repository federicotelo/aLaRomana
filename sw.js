
// SERVICEWORKER
const ONLY_CACHE = 'cache-v1'

const APP_SHELL = [
   // '/',
   'index.html',
   'css/style.css',
   'js/app.js',
   'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
   "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
   'img/dinero.jpg',
   'img/icons/icon-192x192.png',
   'img/icons/icon-256x256.png',
   'img/icons/icon-384x384.png',
   'img/icons/icon-512x512.png',

]




self.addEventListener('install', e => {

   const CO = caches.open(ONLY_CACHE).then(cache => cache.addAll(APP_SHELL))

   e.waitUntil(CO)
})

self.addEventListener('activate', e => {

})

self.addEventListener('fetch', e => {
   //cache with network update
   const respuesta = caches.open(ONLY_CACHE).then(cache => {
      fetch(e.request).then(newResp => {
         cache.put(e.request, newResp)
      })
      return cache.match(e.request)
   })
   e.respondWith(respuesta)

})
