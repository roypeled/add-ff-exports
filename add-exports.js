#! /usr/bin/env node

var fs = require('fs');

var EXTENSION_FILE = "data/extension.js";
var MANIFEST_FILE = "package.json";

function addExports() {
	console.log("Adding exports");
    var data = fs.readFileSync(EXTENSION_FILE, 'utf-8');
    data = "var exports; " + data;
    fs.writeFileSync(EXTENSION_FILE, data, 'utf-8');
    console.log("Success");
};


addExports();


