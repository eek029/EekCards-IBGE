/* ============================================
   EekCards - Service Worker
   Cache offline completo para funcionamento 100% offline
   ============================================ */

const CACHE_NAME = 'eekcards-v1.0.0';
const RUNTIME_CACHE = 'eekcards-runtime-v1';

// Recursos essenciais para cache
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json'
];

// Recursos externos (fontes Google)
const EXTERNAL_ASSETS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
];

// ============================================
// INSTALAÇÃO - Cache de recursos estáticos
// ============================================

self.addEventListener('install', (event) => {
    console.log('[SW] Instalando Service Worker...');

    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME);

                // Cachear recursos estáticos
                console.log('[SW] Cacheando recursos estáticos...');
                await cache.addAll(STATIC_ASSETS);

                // Tentar cachear recursos externos (fontes)
                console.log('[SW] Cacheando recursos externos...');
                for (const url of EXTERNAL_ASSETS) {
                    try {
                        const response = await fetch(url);
                        if (response.ok) {
                            await cache.put(url, response);
                        }
                    } catch (error) {
                        console.warn(`[SW] Não foi possível cachear: ${url}`, error);
                    }
                }

                console.log('[SW] ✅ Todos os recursos estão em cache!');

                // Forçar ativação imediata
                await self.skipWaiting();
            } catch (error) {
                console.error('[SW] ❌ Erro durante instalação:', error);
            }
        })()
    );
});

// ============================================
// ATIVAÇÃO - Limpeza de caches antigos
// ============================================

self.addEventListener('activate', (event) => {
    console.log('[SW] Ativando Service Worker...');

    event.waitUntil(
        (async () => {
            try {
                // Limpar caches antigos
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
                        .map(name => {
                            console.log(`[SW] Removendo cache antigo: ${name}`);
                            return caches.delete(name);
                        })
                );

                // Tomar controle de todas as páginas imediatamente
                await self.clients.claim();

                console.log('[SW] ✅ Service Worker ativado e pronto!');
            } catch (error) {
                console.error('[SW] ❌ Erro durante ativação:', error);
            }
        })()
    );
});

// ============================================
// FETCH - Estratégia Cache-First
// ============================================

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignorar requisições não-HTTP
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Estratégia: Cache-First com Network Fallback
    event.respondWith(
        (async () => {
            try {
                // 1. Tentar buscar do cache primeiro
                const cachedResponse = await caches.match(request);
                if (cachedResponse) {
                    console.log(`[SW] 📦 Cache HIT: ${url.pathname}`);

                    // Atualizar cache em background (stale-while-revalidate)
                    event.waitUntil(updateCache(request));

                    return cachedResponse;
                }

                // 2. Se não estiver em cache, buscar da rede
                console.log(`[SW] 🌐 Cache MISS: ${url.pathname}`);
                const networkResponse = await fetch(request);

                // Cachear a resposta se for bem-sucedida
                if (networkResponse && networkResponse.status === 200) {
                    const cache = await caches.open(RUNTIME_CACHE);
                    cache.put(request, networkResponse.clone());
                }

                return networkResponse;

            } catch (error) {
                console.error(`[SW] ❌ Erro ao buscar: ${url.pathname}`, error);

                // 3. Fallback offline
                return await handleOfflineFallback(request);
            }
        })()
    );
});

// ============================================
// ATUALIZAÇÃO DE CACHE EM BACKGROUND
// ============================================

async function updateCache(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, networkResponse);
            console.log(`[SW] 🔄 Cache atualizado: ${request.url}`);
        }
    } catch (error) {
        // Silenciosamente falhar - já temos cache
        console.log(`[SW] Atualização de cache falhou (offline): ${request.url}`);
    }
}

// ============================================
// FALLBACK OFFLINE
// ============================================

async function handleOfflineFallback(request) {
    const url = new URL(request.url);

    // Para páginas HTML, retornar index.html do cache
    if (request.headers.get('accept').includes('text/html')) {
        const cache = await caches.open(CACHE_NAME);
        const indexResponse = await cache.match('/index.html');
        if (indexResponse) {
            return indexResponse;
        }
    }

    // Para outros recursos, retornar resposta offline genérica
    return new Response(
        JSON.stringify({
            error: 'Offline',
            message: 'Você está offline e este recurso não está em cache.'
        }),
        {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
    );
}

// ============================================
// MENSAGENS DO APP
// ============================================

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_STATS') {
        event.waitUntil(
            (async () => {
                const cacheNames = await caches.keys();
                const stats = {
                    caches: cacheNames.length,
                    version: CACHE_NAME
                };

                const clients = await self.clients.matchAll();
                clients.forEach(client => {
                    client.postMessage({
                        type: 'CACHE_STATS_RESPONSE',
                        data: stats
                    });
                });
            })()
        );
    }
});

// ============================================
// SINCRONIZAÇÃO EM BACKGROUND (Futuro)
// ============================================

self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-progress') {
        console.log('[SW] 🔄 Sincronização de progresso iniciada');
        // Futuro: sincronizar progresso com servidor
    }
});

// ============================================
// NOTIFICAÇÕES PUSH (Futuro)
// ============================================

self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'Hora de revisar seus flashcards!',
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'study',
                title: 'Estudar Agora',
                icon: '/icons/study.png'
            },
            {
                action: 'close',
                title: 'Depois',
                icon: '/icons/close.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('EekCards - Estudos IBGE', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'study') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

console.log('[SW] 🚀 Service Worker carregado! Versão:', CACHE_NAME);
