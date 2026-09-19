const CACHE='multiplication-planet-v31-mobile-token';
const ASSETS=['./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./dex-full-48.png',...Array.from({length:48},(_,i)=>`./assets/creature-${String(i+1).padStart(2,'0')}.png`)];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return r}).catch(()=>caches.match('./index.html')));return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(net=>{const copy=net.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return net})));
});
