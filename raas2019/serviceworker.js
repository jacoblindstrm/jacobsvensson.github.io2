// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open('raas2019Cache').then(raas2019Cache => {
            raas2019Cache.addAll([
                '.',
                '/index.html',
                'assets/fonts/WHOASpineGX-v0.2.ttf',
                'assets/fonts/WHOATopGX-v0.2.ttf'
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
                        }
                    })
            })
    );
});
