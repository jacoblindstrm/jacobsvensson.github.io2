// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open('jacobsvenssoncomCache').then(jacobsvenssoncomCache => {
            jacobsvenssoncomCache.addAll(['index.html', '/assets/styles/main.css']);
        }),
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', fetchEvent => {
    const request = fetchEvent.request;
    request.respondWith(
        fetch(request)
            .then(responseFromFetch => responseFromFetch)
            .catch(() => {
                // eslint-disable-next-line
                caches.match(request).then(responseFromCache => {
                    if (responseFromCache) {
                        return responseFromCache;
                    }
                    if (request.headers.get('Accept').includes('text/html')) {
                        return caches.match('/index.html');
                    }
                });
            }),
    );
});
