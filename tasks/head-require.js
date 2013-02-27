/**
 * head-require.js as a grunt task
 * -------------------------------
 *
 * @example
 * grunt.initConfig({
 *    headRequire : {
 *	      dist : {
 *	          "the/path/to/dest.js" : "the/path/to/main.js"
 *	      }
 *    }
 *  }) 
 *
 */

module.exports = function(grunt){

	grunt.registerMultiTask("headRequire", "HeadRequire.js's compiler", function(){

		var data, name, files, source, getFiles, loadSource;

		data = this.data;

		getFiles = function(name){
			var path, m, files;

			path = name.replace(/[^\/]*?$/, "");
			m = grunt.file.read(name).match(/headRequire\(([\s\S]+?)\)/);
			if(m){
				files = JSON.parse("[" + m[1] + "]").map(function(value){
					return path + value;
				});
				return files;
			}
			return [];
		};

		loadSource = function(files){
			var source = "";

			files.forEach(function(name, index){
				source += grunt.file.read(name);
			});
			return source;
		};

		for(name in data){
			files = getFiles(data[name]);
			source = loadSource(files);
			grunt.file.write(name, source);
		}
	});

};