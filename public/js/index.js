require('../css/main.css');

navigator.serviceWorker.register('../sw.js');

window.addEventListener('beforeinstallprompt', function(e) {
  console.log('beforeinstallprompt Event fired');
  /*e.preventDefault();
  return false;*/

  // e.userChoice will return a Promise.
  // For more details read: http://www.html5rocks.com/en/tutorials/es6/promises/
  e.userChoice.then(function(choiceResult) {

    console.log(choiceResult.outcome);

    if(choiceResult.outcome == 'dismissed') {
      console.log('User cancelled home screen install');
    }
    else {
      console.log('User added to home screen');
    }
  });
});