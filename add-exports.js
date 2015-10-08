#! /usr/bin/env node

var fs = require('fs');

var EXTENSION_FILE = "extension.js";
var EXTENSION_FF_FILE = "data/extension.js";
var BACKGROUND_FILE = "background.js";

function addExports(file) {
	console.log("Adding exports to", file);

    try {
        var stats = fs.lstatSync(file);
    } catch(e){
        console.log("can't find", file);
        return;
    }


    var data = fs.readFileSync(file, 'utf-8');
    data = "var exports; " + data;
    fs.writeFileSync(file, data, 'utf-8');
    console.log("Success");
};


addExports(EXTENSION_FILE);
addExports(EXTENSION_FF_FILE);
addExports(BACKGROUND_FILE);


