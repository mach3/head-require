
var path = require("path");
var fs = require("fs");

var HeadRequireCompiler = function(){

	var my, _my;

	my = this;
	_my = {};

	my.compile = function(file){
		var deps = _my.getDeps(file);
		return _my.loadSources(deps, file);
	};

	_my.getDeps = function(file){
		var dir, content, match, deps;

		dir = path.dirname(file);
		content = _my.readFile(file).replace(/(\/\/[\s\S]+?\n|\/\*[\s\S]+?\*\/)/g, "");
		match = content.match(/headRequire\(([\s\S]+?)\)/);
		if(match){
			deps = match[1].match(/("([^,"\s]+?)"|'([^,'\s]+?)')/g);
			if(deps){
				deps = deps.map(function(value){
					return dir + "/" + value.replace(/(^["']|["']$)/g, "");
				});
				return deps;
			}
		}
		throw new Error("Parse Error : " + file);
	};

	_my.loadSources = function(deps, file){
		var sources, result;

		sources = [];
		deps.forEach(function(value){
			sources.push(_my.readFile(value));
		});
		result = sources.join(";");
		if(result === ""){
			throw new Error("Empty Result : " + file);
		}
		return result;
	};

	_my.readFile = function(file){
		return fs.readFileSync(file, "utf-8");
	};
};

module.exports = new HeadRequireCompiler();
