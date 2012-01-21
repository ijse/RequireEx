var rq = require("..");

// test recurse
rq.requireAll(this, "./imports", {
	recurse: true,
	mode: rq.MODE1
});
