/*eslint-disable*/

var Studio = function () {
    this.dom = {
        html: document.getElementById('html'),
        css: document.getElementById('css'),
        js: document.getElementById('js')
    };

    this.default = function (options) {
        const defaults = {
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            theme: 'panda-syntax'
        };
        let keys = Object.keys(options);
        for (let i = 0; i < keys.length; i++) {
            defaults[keys[i]] = options[keys[i]];
        }
        return defaults;
    };
    this.default = this.default.bind(this);
    this.sessionLoad = function (type) {
        return window.sessionStorage.getItem(type);
    };
    this.editor = {
        html: CodeMirror(this.dom.html, this.default({
            mode: 'text/html',
            value: this.sessionLoad('html') || ''
        })),
        css: CodeMirror(this.dom.css, this.default({
            mode: 'css',
            value: this.sessionLoad('css') || ''
        })),
        js: CodeMirror(this.dom.js, this.default({
            mode: 'javascript',
            value: this.sessionLoad('js') || ''
        }))
    };
    this.sessionSave = function (type) {
        window.sessionStorage.setItem(type, this.editor[type].getValue());
    };

    this.preview = document.getElementsByTagName('iframe')[0];
    this.previewWindow = this.preview.contentWindow;



    CodeMirror.on(this.editor.html, 'change', () => {
        this.sessionSave('html');
        this.preview.src = this.preview.src;
    });
    CodeMirror.on(this.editor.css, 'change', () => {
        this.sessionSave('css');
        this.preview.contentWindow.document.getElementById('style').innerHTML = this.editor.css.getValue();
    });
    CodeMirror.on(this.editor.js, 'change', () => {
        this.sessionSave('js');
        this.preview.src = this.preview.src;
    });

};

var studio = new Studio();
