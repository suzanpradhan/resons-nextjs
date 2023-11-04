self.addEventListener('fetch', (event) => {
  if (event.request.method === 'POST') {
    if (event.request.url.includes('/post/create/') === false) return;
    event.respondWith(Response.redirect('/post/create'));
    event.waitUntil(
      (async function () {
        const data = await event.request.formData();
        const file = data.get('file');
        if (!file) return;
        caches.open('sharedAudioCache').then(function (cache) {
          cache.put('/shared/' + file.name, new Response(file));
        });
      })()
    );
  } else {
    return;
  }
});
