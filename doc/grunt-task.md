
# Grunt Task

## Install

```bash
$ npm install head-require
```

## Usage

Example :

```javascript
module.exports = function(grunt){
	grunt.loadNpmTasks("head-require");

	grunt.initConfig({
		headRequire : {
			dist : {
				optiosn : {},
				files : {
					"the/path/to/dest.js" : "the/path/to/main.js"
				}
			}
		}
	});
};
```

`headRequire` task compiles "main.js" to "dest.js".
Concretely, all scripts passed to `headRequire()` method in "main.js" are to be just combined with ";",
and the result is to be saved as "dest.js".

Then, run it.

```bash
$ grunt headRequire:dist
```

### files

- `files` object must be set of *destination file* as key and *source file (main.js)* as value.
- Values cannot be array as can be in many other grunt tasks, but must be path string.


### Options

- uglify : Boolean (false) - Minify with uglify.js or not
- banner : String ("") - Banner string to be prepended to the compiled result
