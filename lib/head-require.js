/**
 * HeadRequireCompiler
 * -------------------
 * Compiler for head-require, extension for head.js
 */

var path = require("path"),
	fs = require("fs"),
	util = require("util");

/**
 * HeadRequireCompiler
 */
var HeadRequireCompiler = function(){

	var my, _my;

	my = this;
	_my = {};

	_my.options = {
		head : "head"
	};

	/**
	 * Configure options
	 * @param Object options
	 */
	my.config = function(options){
		Object.keys(options).forEach(function(key){
			if(_my.options.hasOwnProperty(key)){
				_my.options[key] = options[key];
			}
		});
	};

	/**
	 * Compile the main.js by file path
	 * @param String file
	 */
	my.compile = function(file){
		var deps = _my.getDeps(file);
		return _my.loadSources(deps, file);
	};

	/**
	 * Get dependencies from `head.require()` in main.js
	 * If `head` is renamed by `head_conf`, set "head" in options by config()
	 * @param String file
	 */
	_my.getDeps = function(file){
		var dir, content, regex, match, deps;

		dir = path.dirname(file);
		content = _my.readFile(file).replace(/(\/\/[\s\S]+?\n|\/\*[\s\S]+?\*\/)/g, "");
		regex = new RegExp( util.format("(%s\\.require)\\(([\\s\\S]+?)\\)", _my.options.head));
		match = content.match(regex);

		if(match){
			deps = match[2].match(/("([^,"\s]+?)"|'([^,'\s]+?)')/g);
			if(deps){
				deps = deps.map(function(value){
					return dir + "/" + value.replace(/(^["']|["']$)/g, "");
				});
				return deps;
			}
		}
		throw new Error("Parse Error : " + file);
	};

	/**
	 * Get combined source from files as array
	 * `file` is for error message
	 * @param Array deps
	 * @param String file
	 * @return String
	 */
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

	/**
	 * Read file aliase
	 * @param String file
	 * @return String
	 */
	_my.readFile = function(file){
		return fs.readFileSync(file, "utf-8");
	};
};

module.exports = new HeadRequireCompiler();
