// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open('jacobsvenssoncomCache').then(jacobsvenssoncomCache => {
            jacobsvenssoncomCache.addAll([
                '.',
                '/index.html',
                '/offline.html',
                'https://use.typekit.net/hhb3mgk.css',
                '/assets/styles/main.css',
                '/assets/images/pattern_blue.svg',
                'assets/images/pattern.svg',
                '/assets/icons/interactiondesignfoundation.svg',
                '/assets/icons/instagram.svg',
                '/assets/icons/medium.svg',
                '/assets/icons/dribbble.svg',
                '/assets/icons/spotify.svg'
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
