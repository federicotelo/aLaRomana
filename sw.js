
// SERVICEWORKER
const ONLY_CACHE = 'cache-v1'

const APP_SHELL = [
   '/',
   '/index.html',
   '/css/style.css',
   '/js/app.js',
   'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
   '/img/dinero.jpg'

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
