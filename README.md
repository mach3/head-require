
# HeadRequire.js

Extension for head.js to use resource loader like require.js

## Feature

- Set main.js in script element's data-main attribute
- Use `headRequire()` to load resource
- Having grunt task to compile


## Resource Loader

### Install

```
$ bower install head-require
```


### Usage

```html
<script src="scripts/head.js"></script>
<script src="scripts/head-require.js" data-main="scripts/main.js"></script>
```

If you set `data-main` attribute in script element of "head-require.js",
this automatically load that script.

For instance, write your main.js like below :

```javascript
headRequire(
	"the/path/to/foojs",
	"the/path/to/bar.js",
	"the/path/to/baz.js"
	"the/path/to/initialize.js"
);
```

The paths of resources is relative from "main.js".

In head.js, the last argument can be callback function, 
but `headRequire` doesn't deal with function,
then you have to initialize in script loaded in the last argument.

(Some day, I may complete this feature in future version)


## Grunt Task To Compile

### Install

```bash
$ npm install head-require
```

### Configure Example

This will save the compiled result of "the/path/to/src/main.js" to "the/path/to/dest/main.js".

```
module.exports = function(grunt){
	grunt.loadNpmTasks("head-require");
	grunt.initConfig({
		dist : {
			options : {
				uglify : true,
				splitBanners : true,
				banner : "/* my script */\n"
			},
			files : {
				"the/path/to/dest/main.js" : "the/path/to/src/main.js"
			}
		}
	});
};
```

- *Caution* : This interface is changed at version 1.1.0
- *Caution* : Values in files object must not be array, but string

### Options

- uglify : Boolean (false) - Minify by uglify.js or not
- splitBanners : Boolean (false) - Add comment banner or not
- banner : String ("") - Banner string


## "app" Object

head-require.js create `app` object as a member of global object.

### Properties

- path : String - The path to main.js
- options : Object ({}) - container for set() and get()

```
var jsPath = app.path; // "scripts/"
```

### Methods

- set(name:String , value:Mixed) : void - Setter for options
- get(name:String) : Mixed - Getter for options

```
app.set("foo", "bar");
// or pass object
app.set({foo : "bar"});

app.get("foo"); // "bar"
```

### Change `app`'s Name

To change the name of `app`, set "data-appname" attribute in script element.

```
<script src="script/head-require.js" data-main="script/main.js" data-appname="myapp"></script>
```

Then you can refer to app object as `myapp` in global.

```
myapp.set("foo", "bar");
```

-----

## Author

mach3

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)
