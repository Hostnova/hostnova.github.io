// Service Worker for HostNova PWA
// Version: 1.0.0

const CACHE_NAME = 'hostnova-v1.0.0';
const STATIC_CACHE_NAME = 'hostnova-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'hostnova-dynamic-v1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/css/main-landing.css',
  '/css/base.css',
  '/css/layout.css',
  '/css/animations.css',
  '/css/style.css',
  '/css/landing-style.css',
  '/css/components/responsive-enhancements.css',
  '/css/components/image-optimization.css',
  '/css/components/core-web-vitals.css',
  '/css/components/pwa-enhancements.css',
  '/css/components/cosmic-background.css',
  '/css/components/hero.css',
  '/css/components/navigation.css',
  '/css/components/buttons.css',
  '/css/components/cards.css',
  '/css/components/footer.css',
  '/images/hostnova-logo.png',
  '/images/backgrounds/hero-poster.jpg',
  '/videos/futuristic_network_animation.mp4',
  '/site.webmanifest'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName.startsWith('hostnova-')) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and external requests
  if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
    return;
  }
  
  // Handle different types of requests
  if (STATIC_ASSETS.includes(url.pathname)) {
    // Static assets - cache first strategy
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.includes('/images/') || url.pathname.includes('/css/') || url.pathname.includes('/js/')) {
    // Media and assets - cache first with fallback
    event.respondWith(cacheFirst(request));
  } else {
    // HTML pages - network first with cache fallback
    event.respondWith(networkFirst(request));
  }
});

// Cache first strategy
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Cache first failed:', error);
    
    // Return offline fallback if available
    if (request.destination === 'document') {
      return caches.match('/index.html');
    }
    
    throw error;
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network first failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for HTML requests
    if (request.destination === 'document') {
      return caches.match('/index.html');
    }
    
    throw error;
  }
}

// Handle background sync for offline actions
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background sync logic here
  console.log('Service Worker: Performing background sync');
}

// Handle push notifications
self.addEventListener('push', event => {
  console.log('Service Worker: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'HostNova update available',
    icon: '/images/hostnova-logo.png',
    badge: '/images/icons/favicon-32x32.png',
    tag: 'hostnova-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/images/icons/favicon-32x32.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('HostNova', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Cleanup expired caches periodically
setInterval(async () => {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const requests = await cache.keys();
  
  // Remove old entries (older than 7 days)
  const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  
  for (const request of requests) {
    const response = await cache.match(request);
    const dateHeader = response.headers.get('date');
    
    if (dateHeader) {
      const responseDate = new Date(dateHeader).getTime();
      if (responseDate < oneWeekAgo) {
        await cache.delete(request);
        console.log('Service Worker: Removed expired cache entry:', request.url);
      }
    }
  }
}, 24 * 60 * 60 * 1000); // Run daily
