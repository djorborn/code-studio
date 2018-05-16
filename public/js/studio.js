function Studio () {
  this.dom = {
    html: document.getElementById('html'),
    css: document.getElementById('css'),
    js: document.getElementById('js')
  }
  this.defualts = function (arg) {
    const defualts = {
      lineNumbers: true,
      autoCloseTags: true,
      autoCloseBrackets: true
    }
    if (arg) {
      const key = Object.keys(arg)
      for (var i = 0; i < key.length; i++) {
        defualts[key[i]] = arg[key[i]]
      }
    }
    return defualts
  }
  this.defualts = this.defualts.bind(this)

  this.cm = {
    html: CodeMirror(this.dom.html, this.defualts({mode: 'text/html'})),
    css: CodeMirror(this.dom.css, this.defualts({mode: 'css'})),
    js: CodeMirror(this.dom.js, this.defualts({mode: 'javascript'}))
  }
  this.html = this.cm.html
  this.css = this.cm.css
  this.js = this.cm.js
}
