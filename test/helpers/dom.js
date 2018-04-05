import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>', {url: "http://set-in-dom-js.com"});
const win = doc.defaultView;

global.document = doc;
global.window = win;

global.localStorage = {
    _store: {},
    getItem: function(key) {
        return this._store[key]
    },
    setItem: function(key, value) {
        this._store[key] = value
    },
    removeItem: function(key) {
        delete this._store[key]
    }
};

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});
