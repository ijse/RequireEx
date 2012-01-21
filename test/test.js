
// test basic
var basic = require("./basic");

// test recurse
var recurse = require("./recurse");

// test strict
//var strict = require("./strict");

// test matches
var matches = require("./matches");

// test mode
var mode = require("./mode");

/*
 * Output: 
 */ 
output("basic", basic);
output("recurse", recurse);
//output("strict", strict);
output("mode", mode);
output("matches", matches);


function output(name, obj) {
	console.log("Test results of %s:", name);
	!obj.t1 || console.log(obj.t1);
	!obj.t2 || console.log(obj.t2);
	!obj.r1 || console.log(obj.r1);
	!obj.r2 || console.log(obj.r2);
	!obj.sub || console.log(obj.sub.r1);
	!obj.sub || console.log(obj.sub.r2);
	console.log('---');
	console.log(obj);
	console.log('---');

}

