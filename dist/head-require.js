/**
 * HeadRequire.js
 * --------------
 * Copyright (C) 2013 Matsukaze.
 *
 * @version 1.3.0
 * @author mach3
 * @require head.js <http://headjs.com>
 *
 */
 (function(global, doc){

	var app, loader;

	/**
	 * app object
	 */
	app = {
		/**
		 * Attributes: 
		 * - path:String => Path to main.js
		 * - lib:Object => Container for libraries
		 * - options:Object => Container for options
		 */
		path : null,
		lib : {},
		options : {},

		/**
		 * Set option by key (from named prop)
		 * @param String key
		 * @param Mixed value
		 * @param String prop (optional)
		 */
		set : function(key, value, prop){
			var i, data;
			prop = prop || "options";
			if(key instanceof String || typeof key === "string"){
				this[prop][key] = value;
				return;
			}
			data = key;
			for(i in data){
				if(! data.hasOwnProperty(i)){ continue; }
				this.set(i, data[i]);
			}
		},

		/**
		 * Get option by key (from named prop)
		 * @param String key
		 * @param String prop (optional)
		 */
		get : function(key, prop){
			prop = prop || "options";
			if(this[prop].hasOwnProperty(key)){
				return this[prop][key];
			}
		}
	};

	/**
	 * loader object
	 */
	loader = {
		/**
		 * Attributes:
		 * - scripts:Array => List of main.js
		 * - appname:String => Name of app object in global
		 * - path:String => Path to main.js
		 */
		scripts : [],
		appname : "app",
		path : null,

		/**
		 * Initialize
		 * Get self node, get values from data-* attributes, then load main.js
		 */
		init : function(){
			var self = this;
			// attributes
			this.node = this._getSelf();
			this.appname = this._data("appname") || this.appname;
			this._each((this._data("main") || "").split(/[\s,]/), function(value){
				if(value){ self.scripts.push(value); }
			});
			if(this.scripts.length){
				this.path = this._dirname(this.scripts[0]);
				// app
				app.path = this.path;
				global[this.appname] = app;
				// load
				head.js.apply(head, this.scripts);
			}
		},

		/**
		 * Load resources
		 * To be called as `head.require`
		 */
		require : function(/* file1, file2, file3 ... */){
			var path, resources;
			path = this.path;
			resources = [];
			this._each(arguments, function(value, key){
				resources[key] = path + value;
			});
			head.js.apply(head, resources);
		},

		/**
		 * Get self node
		 */
		_getSelf : function(){
			var nodes = doc.getElementsByTagName("script");
			return nodes[nodes.length - 1];
		},

		/**
		 * Get data attribute by name
		 * @param String name
		 * @return String
		 */
		_data : function(name){
			return this.node.getAttribute("data-" + name);
		},

		/**
		 * Get directory name from path
		 * @param String path
		 * @return String
		 */
		_dirname : function(path){
			return path.replace(/(#|\?).+$/g, "").replace(/[^\/]+$/, "");
		},

		/**
		 * Run callback for each props
		 * @param Object|Array o
		 * @param Function callback
		 */
		_each : function(o, callback){
			var i;
			for(i in o){
				if(! o.hasOwnProperty(i)){ continue; }
				if(false === callback(o[i], i, o)){ break; }
			}
		}
	};

	head.require = headRequire = function(){
		loader.require.apply(loader, arguments);
	};

	loader.init();

}(this, document));