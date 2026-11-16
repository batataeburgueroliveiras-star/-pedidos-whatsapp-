// Service worker do Coronel Gastrobar.
// Guarda apenas a página e os arquivos estáticos. Nunca guarda pedidos, dados de clientes
// nem chamadas a outros domínios (ex.: Supabase).
const CACHE = 'coronel-gastrobar-v1';
const ESTATICOS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './coronel-triste.jpg', './coronel-polegar.jpg', './coronel-caneca.jpg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ESTATICOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(chaves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    // Página: tenta a rede primeiro e guarda a última versão; sem rede, usa a guardada.
    event.respondWith(
      fetch(req)
        .then((resp) => { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put('./index.html', copia)); return resp; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Arquivos estáticos: primeiro o cache, depois a rede.
  event.respondWith(caches.match(req).then((r) => r || fetch(req)));
});
