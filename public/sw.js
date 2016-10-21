importScripts('/js/sw-toolbox.js');

toolbox.router.default = toolbox.networkFirst;
toolbox.options.networkTimeoutSeconds = 5;

toolbox.precache(['/index.html', '/js/app.js', '/js/vendors.js', '/css/app.css', '/css/vendors.css']);
toolbox.router.any('/images/*', toolbox.fastest);

self.addEventListener('push', function(event) {
  console.log('Push message received', event);

  event.waitUntil(
    self.registration.showNotification('title', {
     body: 'body',
     icon: 'https://github.com/apple-touch-icon-144x144.png',
     tag: 'tag'
   }));
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click: tag', event.notification.tag);

  event.notification.close();
  var url = 'http://127.0.0.1:8080/';
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url.indexOf(url) !== -1 && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});