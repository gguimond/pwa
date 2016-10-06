importScripts('/js/sw-toolbox.js');

toolbox.router.default = toolbox.networkFirst;
toolbox.options.networkTimeoutSeconds = 5;

toolbox.precache(['/index.html', '/js/app.js', '/js/vendors.js', '/css/app.css', '/css/vendors.css']);
toolbox.router.any('/images/*', toolbox.fastest);