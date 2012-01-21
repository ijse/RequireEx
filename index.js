
var path = require("path");
var fs = require("fs");

exports.MODE1 = this.MODE1 = 1;
exports.MODE0 = this.MODE0 = 0;

/**
 * @param {Object} filters
 *			 matches: array
 *           strict: boolean
 *			 recurse: boolean
 *			 mode: MODE1 | MODE2
 *           
 */
exports.requireAll = function(_exports, folder, filters, basepath) {
	debugger;
	var abpath = basepath || path.resolve(folder);
	filters = filters || {};
	filters.matches = Array.isArray(filters.matches) ? filters.matches : filters.matches ? [filters.matches] : [];
	filters.strict = !!filters.strict ;
	filters.recurse = !!filters.recurse ;
	filters.mode = filters.mode || 0;

	if(!folder || !(fs.statSync(abpath).isDirectory())) 
		throw new Error("Folder error!!");	

	var files = fs.readdirSync(path.join(abpath, folder));
	while(files.length > 0) {
		var file = files.pop();

		// handle recurse and pass directories
		var testFile = path.join(abpath, file);
		if(fs.statSync(testFile).isDirectory()) { // if directory
			if(filters.recurse) { // if recurse the directory 
				var subfiles = fs.readdirSync(testFile);
				var newFiles = subfiles.map(function(elem, index, arr) {
					return path.join(file, elem);
				});
				files = files.concat(newFiles);
			}	
			continue ; // pass the directory
		}

		// handle matches
		var jfoo = function(elem, index, arr) {
			return new RegExp(elem).test(file);
		}
		var isInclude = filters.matches && filters.matches.length != 0 ? filters.matches.filter(jfoo).length > 0 : true; // if define matches, only matches item will qualify
		if(!isInclude)
			continue;

		// concat exports
		var moduleExports = require(path.join(abpath, file));
		for(var key in moduleExports ) {

			// handle strict mode
			if(filters.strict) { // if strict mode, error will be thrown when comes up duplicate keys
				if(_exports[key])
					throw new Error("Duplicate key of " + key);
			}
			
			if(filters.mode === this.MODE0) { // remove paths
				_exports[key] = moduleExports[key];
			} else if(filters.mode === this.MODE1) {  // convert / to .
				debugger;
				var foldernames = path.dirname(path.normalize(file)).split("/");
				var s = _exports;
				for(var i=0; i<foldernames.length; i++) {
					var t = foldernames[i];
					if(/^(\.|\.\.)$/.test(t))
						continue;
					s = s[t] = s[t] || {};
				}
				s[key] = moduleExports[key];
			}
		}

	}
}
