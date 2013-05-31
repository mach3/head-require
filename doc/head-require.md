# head-require.js

## Install

Manually download, or use `bower install` if you have installed.

```
$ bower install head-require
```

## Usage

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

"script/main.js", the script in `data-main` attribute, is to be loaded on DOM ready.
Then, `headRequire()` load scripts in its arguments.

The paths in arguments must be relative path from "script/main.js".

## `app` Object

`app` object is to be defined in global (`window` object's member in browser) as an optional feature.
You may use it as namespace in resource scripts, or use setter and getter methods.

```
app.MyWidget = function(){ ... };
```

### Properties

- path : String - The path to main.js
- options : Object ({}) - Options

### Methods

- set(key:String, value:Mixed) : void - Set value to options
- get(key:String) : Mixed - Get value from options