# head-require.js

## Install

`bower install` if you have installed bower, or manually download.

```
$ bower install head-require
```

## Usage

### Basic

```html
<script src="scripts/head.js"></script>
<script src="scripts/head-require.js" data-main="scripts/main.js"></script>
```
"scripts/main.js" is like this : 

```javascript
head.require(
	"the/path/to/foojs",
	"the/path/to/bar.js",
	"the/path/to/baz.js"
	"the/path/to/initialize.js"
);
```

"script/main.js", the script in `data-main` attribute, is to be loaded on DOM ready.
Then, `head.require()` load scripts in its arguments.

The paths in arguments must be relative path from "script/main.js".

### Multiple main.js

Set comma or space separated file names to `data-main` attribute to import multiple main.js.
All the files in `data-main` must be saved in the same directory.

```html
<script src="scripts/head-require.js" data-main="sciprts/common.js, scripts/main.js"></script>
```

## app Object

`app` object is to be defined in global (`window` object's member in browser) as an optional feature.
You may use it as namespace in your own scripts.

```
app.MyWidget = function(){ ... };
```

If you want to change the `app` object's name, set the name you like to `data-appname` attribute.

```
<script src="scripts/head-require.js" data-main="scripts/main.js" data-appname="myapp"></script>
```

### Properties

- path : String - The path to main.js
- options : Object ({}) - Options
- lib : Object ({}) - Container for your own library

### Methods

- set(key:String, value:Mixed) : void - Set value to options
- get(key:String) : Mixed - Get value from options
