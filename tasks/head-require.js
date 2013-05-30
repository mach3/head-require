/**
 * head-require.js as a grunt task
 * -------------------------------
 */

/*

@example 

grunt.initConfig({
	headRequire : {
		dist : {
			options : {
				uglify : true,
				splitBanners : true,
				banenr : ""
			},
			files : {
				"the/path/to/dest.js" : "the/path/to/main.js"
			}
		}
	}
});

 */

module.exports = function(grunt){

	grunt.registerMultiTask("headRequire", "HeadRequire.js's compiler", function(){

		var options, uglify, getFiles, loadSource, dest, source;

		uglify = require("uglify-js");
		options = this.options({
			uglify : false,
			splitBanners : false,
			banner : ""
		});

		getFiles = function(name){
			var path, files, content, headRequire, funcs;

			path = name.replace(/[^\/]*?$/, "");
			files = [];
			headRequire = function(){
				Array.prototype.forEach.call(arguments, function(value){
					files.push(path + value);
				});
			};
			content = grunt.file.read(name)
				.replace(/\/\/[\s\S]+?\n/g, "")
				.replace(/\/\*[\s\S]+?\*\//g, "")
				.replace(/\s/g, "");
			funcs = content.match(/headRequire\(([\s\S]+?)\)/g);
			if(funcs){
				funcs.forEach(function(func){
					eval(func);
				});
			}
			return files;
		};

		loadSource = function(files){
			var source = "";

			files.forEach(function(name, index){
				source += grunt.file.read(name) + ";";
			});
			return source;
		};

		for(dest in this.data.files){
			source = loadSource(getFiles(this.data.files[dest]));
			grunt.file.write(dest, source);
			if(options.uglify){
				source = uglify.minify(dest).code;
				grunt.file.write(dest, source);
			}
			if(options.splitBanners){
				grunt.file.write(dest, options.banner + source);
			}
		}
	});

};