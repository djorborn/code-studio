
const studio = new Studio()

const liveRoom = document.getElementById('liveRoom')
const win = liveRoom.contentWindow

CodeMirror.on(studio.html, 'change', function () {
    saveCode('html')
    liveRoom.src = liveRoom.src
})
CodeMirror.on(studio.css, 'change', function () {
    saveCode('css')
    win.document.getElementById('css').innerHTML = studio.css.getValue()
})
CodeMirror.on(studio.js, 'change', function () {
    saveCode('js')
    liveRoom.src = liveRoom.src
})

function saveCode(type) {
    window.sessionStorage.setItem(type, studio[type].getValue());
}

function loadLive() {
    liveRoom.contentWindow.document.getElementById('css').innerHTML = window.sessionStorage.getItem('css')
}

function loadCode () {
    studio.html.setValue(
        window.sessionStorage.getItem('html')
    )

    studio.css.setValue(
        window.sessionStorage.getItem('css')
    )

    studio.js.setValue(
        window.sessionStorage.getItem('js')
    )
}

window.onload = function () {
    loadLive()

loadCode()
}