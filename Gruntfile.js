module.exports = function(grunt){

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadTasks("tasks");

	var pkg = grunt.file.readJSON("package.json");
	var options = {
		splitBanners : true,
		banner : grunt.template.process(grunt.file.read("src/banner.js"), {data:pkg})
	};

	grunt.initConfig({

		concat : {
			options : options,
			dist : {
				files : {
					"./dist/head-require.js" : "./src/head-require.js"
				}
			}
		},

		uglify : {
			options : options,
			dist : {
				files : {
					"./dist/head-require.min.js" : "./src/head-require.js"
				}
			}
		},

		headRequire : {
			demo : {
				options : {
					uglify : true,
					banner : "/* updated : <%= grunt.template.today('yyyy-mm-dd') %> */\n",
					head : "_head_"
				},
				files : {
					"demo/scripts/lib.combined.js" : "demo/scripts/lib.js",
					"demo/scripts/main.combined.js" : "demo/scripts/main.js"
				}
			}
		}
	});

	grunt.registerTask("default", ["concat", "uglify"]);

};