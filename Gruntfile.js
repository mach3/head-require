

var fs = require("fs");




module.exports = function(grunt){


	grunt.initConfig({

		meta : {
			banner : fs.readFileSync("./src/banner.js", "utf-8")
		},

		concat : {
			dist : {
				src : ["<banner>", "./src/head-require.js"],
				dest : "./dist/head-require.js"
			}
		},

		min : {
			dist : {
				src : ["<banner>", "./src/head-require.js"],
				dest : "./dist/head-require.min.js"
			}
		}
	});

	grunt.registerTask("default", "concat min");

};