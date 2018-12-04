// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open('jacobsvenssoncomCache').then(jacobsvenssoncomCache => {
            jacobsvenssoncomCache.addAll([
                '/index.html',
                '/offline.html'
            ]);
        }),
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', fetchEvent => {
    const request = fetchEvent.request;
    fetchEvent.respondWith(
        fetch(request)
            .then(responseFromFetch => {
                return responseFromFetch;
            })
            .catch(fetchError => {
                caches.match(request)
                    .then(responseFromCache => {
                        if (responseFromCache) {
                            return responseFromCache;
                        } else {
                            if (request.headers.get('Accept').includes('text/html')) {
                                return caches.match('/offline.html');
                            }
                        }
                    })
            })
    );
});
