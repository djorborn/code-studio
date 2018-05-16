const b = '/bower_components'
const c = '/codemirror'
var bc = b + c


module.exports = {
  styles: function () {
    return [
      bc + '/lib/codemirror.css',
      bc + '/theme/panda-syntax.css',
      bc + '/addon/hint/show-hint.css',
      bc + '/addon/fold/foldgutter.css',
      bc + '/theme/base16-light.css',
      bc + '/theme/base16-dark.css',
      bc + '/theme/dracula.css',
      bc + '/theme/duotone-light.css',
      bc + '/theme/duotone-dark.css',
      bc + '/theme/hopscotch.css',
    ]
  },
  scripts: function () {
    return [
      bc + '/lib/codemirror.js',
      bc + '/mode/javascript/javascript.js',
      bc + '/mode/xml/xml.js',
      bc + '/mode/htmlmixed/htmlmixed.js',
      bc + '/mode/css/css.js',
      bc + '/addon/edit/closebrackets.js',
      bc + '/addon/edit/closetag.js',
      bc + '/addon/edit/matchtags.js',
      bc + '/addon/edit/closebrackets.js',
      bc + '/addon/fold/brace-fold.js',
      bc + '/addon/fold/comment-fold.js',
      bc + '/addon/fold/foldcode.js',
      bc + '/addon/fold/foldgutter.js',
      bc + '/addon/fold/xml-fold.js',
      bc + '/addon/fold/indent-fold.js',
      bc + '/addon/hint/anyword-hint.js',
      bc + '/addon/hint/css-hint.js',
      bc + '/addon/hint/html-hint.js',
      bc + '/addon/hint/javascript-hint.js',
      bc + '/addon/hint/xml-hint.js',
    ]
  }
}
