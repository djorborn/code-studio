document.getElementById('style').innerHTML = window.sessionStorage.getItem('css')
document.getElementById('script').innerHTML = `window.onload = function () {
  ${window.sessionStorage.getItem('js')}
}`
