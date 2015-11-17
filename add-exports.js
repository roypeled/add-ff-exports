#! /usr/bin/env node

var fs = require('fs');

var EXTENSION_FILE = "extension.js";
var EXTENSION_FF_FILE = "data/extension.js";
var BACKGROUND_FILE = "background.js";
var MANIFEST = "manifest.json";

function addExports(file) {
    console.log("Adding exports to", file);

    try {
        fs.lstatSync(file);
    } catch(e){
        console.log("can't find", file);
        return;
    }


    var data = fs.readFileSync(file, 'utf-8');
    data = "var exports; " + data;
    fs.writeFileSync(file, data, 'utf-8');
    console.log("Success");
}

function renameSourceMaps(file){
    console.log("Rename source maps root for", file);

    try {
        fs.lstatSync(file);
        fs.lstatSync(MANIFEST);
    } catch(e){
        console.log("can't find", file);
        return;
    }

    var data = fs.readFileSync(file, 'utf-8');
    var manifest = fs.readFileSync(MANIFEST, 'utf-8');

    manifest = JSON.parse(manifest);

    var mapRoot = "chrome-extension://" + manifest.key + "/";

    data = data.replace(/sourceMappingURL\=/gi, "sourceMappingURL=" + mapRoot);\
    fs.writeFileSync(file, data, 'utf-8');
    console.log("Success");
}


addExports(EXTENSION_FILE);
addExports(EXTENSION_FF_FILE);
addExports(BACKGROUND_FILE);

renameSourceMaps(EXTENSION_FILE);
renameSourceMaps(BACKGROUND_FILE);


