var fs = require('fs');
var path = require('path');
var colors = require('colors');
var Spelling = require('spelling');
var lookup = (new Spelling(require('../dict/en_US'))).lookup;

function Pret() {
    this.dictionary = _getDefaultDictionary();
}

Pret.prototype.getDictionary = function () {
    return this.dictionary.join('\n');
};

Pret.prototype.setDictionary = function (dictionary) {
    if (typeof dictionary == 'string') {
        dictionary = dictionary.split('\r\n');
    }
    this.dictionary = dictionary;
};

Pret.prototype.translate = function (word) {
    if (!word || !word.replace(/\s+/)) {
        return;
    }
    var index = this.dictionary.indexOf(word.toLowerCase());
    if (index < 0) {
        var corrections = (lookup(word).suggestions || [])
            .map(function (s) { return s && s.word })
            .filter(Boolean);
        return 'No translation found  for ' + word.red  + (corrections.length ? '!\nTry ' + ((corrections.length > 1) ? 'one of the followings: ' : '') + corrections.join(', ') : '!');
    }
    var doc = this.dictionary[index++].green;
    do {
        doc += '\n' + this.dictionary[index];
        index++;
    } while (this.dictionary[index].search(/^\w+$/) == -1 && this.dictionary[index].replace(/\s+/, '') && index < this.dictionary.length);
    return this.sanitize(doc);
};

Pret.prototype.translateBatch = function (text) {
    if (Array.isArray(text)) {
        var arr = [];
        for (var index in text) {
            arr.push(this.translate(text[index]));
        }
        return arr;
    }

    var words = text.split(/\b/);
    var trs = '';
    for (var index in words) {
        var result = this.translate(words[index]);
        if (result) {
            trs += result + '\n\n';
        }
    }
    return trs;
};

Pret.prototype.sanitize = function (doc) {
    return doc.replace(/\[(\/?[\w*\d\s=]+?)\]/g, '').replace(/\\(\[|\])/g, '$1');
};

var _defaultDictionary;

function _getDefaultDictionary() {
    if (_defaultDictionary) {
        return _defaultDictionary;
    }

    var dictPath = path.join(__dirname, '../dict/CollinsCobuildEnEn.dsl');

    if (!fs.existsSync(dictPath)) {
        throw new Error('No dictionary file found at' + dictPath + ' path!');
    } else {
        _defaultDictionary = fs.readFileSync(dictPath, 'UTF8').split('\r\n');

        return _defaultDictionary;
    }
}

module.exports = new Pret();
module.exports.Pret = Pret;
