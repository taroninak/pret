#! /usr/bin/env node

/**
 * Pret CLI
 */

var path = require('path');
var wrap = require('wordwrap');
var pret = require(path.join(__dirname, '../lib/pret'));

if(require.main == module) {
    main();
}

function main() {
    var text = process.argv.slice(2);
    if(text && text.length) {
        return console.log(indent(pret.translateBatch(text)));
    }

    process.on("SIGPIPE", process.exit);

    var data = '';
    process.stdin.on('data', (chunk) => {
        data += chunk.toString().replace(/\s+/g,' ').trim();
    });

    process.stdin.on('end', function () {
        console.log(indent(pret.translateBatch(data)));
    });

    process.stdout.on('error', function (err) {
        process.exit(0);
    });

}

function indent(text) {
    var width = getWidth();
    if(text) {
        return wrap(5, width)(text);
    }
}

function getWidth() {
    if(process.stdout.isTTY) {
        return process.stdout.columns < 80 ? process.stdout.columns : 80;
    }
    return 80;

}
