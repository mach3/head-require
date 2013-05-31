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
				banner : ""
			},
			files : {
				"the/path/to/dest.js" : "the/path/to/main.js"
			}
		}
	}
});

 */

module.exports = function(grunt){

 	grunt.registerMultiTask("headRequire", "head-require.js's compiler", function(){

 		var my = {

 			uglify : require("uglify-js"),
 			hrc : require("../lib/head-require"),
 			options : this.options({
 				uglify : false,
 				banner : ""
 			}),

 			init : function(files){
 				var banner;

 				banner = grunt.template.process(my.options.banner);
 				grunt.util._.forEach(files, function(src, dest){
 					var content;

 					try {
	 					content = my.hrc.compile(src);
 						grunt.file.write(dest, content);

	 					if(my.options.uglify){
	 						content = my.uglify.minify(dest).code;
	 						grunt.file.write(dest, content);
	 					}
	 					if(banner){
	 						content = banner + content;
	 						grunt.file.write(dest, content);
	 					}
	 					grunt.log.writeln("Compiled : " + dest + " < " + src);

 					} catch(e){
 						grunt.log.error(e.message);
 					}
 				});
 			}
 		};

 		my.init(this.data.files);
 	});
};