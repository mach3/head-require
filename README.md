
# HeadRequire.js

Extension for head.js to use resource loader like require.js

## Feature

- Set main.js in script element's data-main attribute
- Use `headRequire()` to load resources
- Grunt task to compile them to a file


## Basic Usage

### Resource Loader

```html
<script src="scripts/head.js"></script>
<script src="scripts/head-require.js" data-main="scripts/main.js"></script>
```
"scripts/main.js" like this : 

```javascript
headRequire(
	"the/path/to/foojs",
	"the/path/to/bar.js",
	"the/path/to/baz.js"
	"the/path/to/initialize.js"
);
```

&raquo; [Learn more about head-require.js](doc/head-require.md)

### Grunt Task to Compile

Example :

```javascript
grunt.initConfig({
	headRequire : {
		dist : {
			options : {},
			files : { "the/path/to/dest.js" : "the/path/to/main.js" }
		}
	}
});
```

&raquo; [Learn more about Grunt task](doc/grunt-task.md)

-----

## Author

mach3

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)
