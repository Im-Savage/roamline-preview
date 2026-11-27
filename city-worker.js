
const prefix = 'roamline:' + self.registration.scope + ':';
const cacheId = prefix + "e65655839a09cd97fc";
const files = ["assets/AssetManifest.bin","assets/AssetManifest.bin.json","assets/FontManifest.json","assets/NOTICES","assets/assets/audio/CREDITS.txt","assets/assets/audio/anchiskhati.mp3","assets/assets/audio/bath-domes.mp3","assets/assets/audio/dry-bridge.mp3","assets/assets/audio/gabriadze-clock.mp3","assets/assets/audio/kashveti.mp3","assets/assets/audio/national-gallery.mp3","assets/assets/audio/nine-april-garden.mp3","assets/assets/audio/opera-house.mp3","assets/assets/audio/orbeliani-bath.mp3","assets/assets/audio/peace-bridge.mp3","assets/assets/audio/turn-back.mp3","assets/assets/audio/turn-left.mp3","assets/assets/audio/turn-right.mp3","assets/assets/catalog.json","assets/assets/exhibitions.json","assets/assets/google_maps/google_maps_attribution.png","assets/assets/google_maps/walk.html","assets/assets/history/CREDITS.txt","assets/assets/history/baths.jpg","assets/assets/history/metekhi.jpg","assets/assets/history/opera.jpg","assets/assets/network.json","assets/assets/photos/CREDITS.txt","assets/assets/photos/anchiskhati.jpg","assets/assets/photos/bath-domes.jpg","assets/assets/photos/caravanserai.jpg","assets/assets/photos/dedaena-park.jpg","assets/assets/photos/dry-bridge.jpg","assets/assets/photos/ereklestreet.jpg","assets/assets/photos/freedom-square.jpg","assets/assets/photos/gabriadze-clock.jpg","assets/assets/photos/georgian-museum.jpg","assets/assets/photos/gorgasali-statue.jpg","assets/assets/photos/gudiashvili-square.jpg","assets/assets/photos/juma-mosque.jpg","assets/assets/photos/kashveti.jpg","assets/assets/photos/leonidze-garden.jpg","assets/assets/photos/meidan.jpg","assets/assets/photos/metekhi-bridge.jpg","assets/assets/photos/metekhi-church.jpg","assets/assets/photos/national-gallery.jpg","assets/assets/photos/nine-april-garden.jpg","assets/assets/photos/opera-house.jpg","assets/assets/photos/orbeliani-bath.jpg","assets/assets/photos/orbeliani-square.jpg","assets/assets/photos/parliament.jpg","assets/assets/photos/peace-bridge.jpg","assets/assets/photos/pushkin-garden.jpg","assets/assets/photos/rike-park.jpg","assets/assets/photos/rustaveli-theatre.jpg","assets/assets/photos/shardeni.jpg","assets/assets/photos/sioni.jpg","assets/assets/places.json","assets/assets/type/DM-Sans-OFL.txt","assets/assets/type/DM-Sans.ttf","assets/assets/type/Instrument-Serif-OFL.txt","assets/assets/type/Instrument-Serif.ttf","assets/assets/type/Noto-Sans-Georgian-OFL.txt","assets/assets/type/Noto-Sans-Georgian.ttf","assets/fonts/MaterialIcons-Regular.otf","assets/fonts/fallback/Roboto-Regular.ttf","assets/packages/google_maps_flutter_web/assets/blue-dot.png","assets/packages/google_maps_flutter_web/assets/my_location-sprite-2x.png","assets/packages/material_ui/shaders/ink_sparkle.frag","assets/shaders/ink_sparkle.frag","assets/shaders/stretch_effect.frag","canvaskit/canvaskit.js","canvaskit/canvaskit.wasm","canvaskit/chromium/canvaskit.js","canvaskit/chromium/canvaskit.wasm","canvaskit/skwasm.js","canvaskit/skwasm.wasm","canvaskit/skwasm_heavy.js","canvaskit/skwasm_heavy.wasm","canvaskit/webparagraph/canvaskit.js","canvaskit/webparagraph/canvaskit.wasm","canvaskit/wimp.js","canvaskit/wimp.wasm","favicon.png","flutter.js","flutter_bootstrap.js","icons/Icon-192.png","icons/Icon-512.png","icons/Icon-maskable-192.png","icons/Icon-maskable-512.png","index.html","main.dart.js","manifest.json","privacy.html","version.json"];
const url = p => new URL(p, self.registration.scope).href;
self.addEventListener('install', event => event.waitUntil((async () => {
  const cache = await caches.open(cacheId);
  await cache.addAll(files.map(p => new Request(url(p), {cache:'reload'})));
  await self.skipWaiting();
})()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith(prefix) && k !== cacheId).map(k => caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.registration.scope)) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheId);
    const cached = await cache.match(event.request, {ignoreSearch:true});
    if (cached) return cached;
    const pathname = new URL(event.request.url).pathname;
    const appRoot = new URL(self.registration.scope).pathname;
    if (event.request.mode === 'navigate' && (pathname === appRoot || pathname === appRoot + 'walk')) {
      return (await cache.match(url('index.html'))) || fetch(event.request);
    }
    return fetch(event.request);
  })());
});
