var rq = require("..");

// test recurse
rq.requireAll(this, "./imports", {
	matches: /2/,
	recurse: true 
});
