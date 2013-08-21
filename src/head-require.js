(function(global, doc){

	var app, loader, head;

	/**
	 * detect "head" name
	 */
	head = (function(){
		if(global.head_conf && global.head_conf.head){
			return global[global.head_conf.head];
		}
		return global.head;
	}());

	/**
	 * app object
	 */
	app = {
		/**
		 * Attributes: 
		 * - path:String => Path to main.js
		 * - lib:Object => Container for libraries
		 * - attributes:Object => Container for variables
		 */
		path: null,
		lib: {},
		attributes: {},

		/**
		 * Set option by key (from named prop)
		 * @param String key | Object vars
		 * @param Mixed value
		 */
		set: function(key, value){
			var i, vars;
			if(key instanceof String || typeof key === "string"){
				this.attributes[key] = value;
			} else {
				vars = key;
				for(i in vars){
					if(! vars.hasOwnProperty(i)){ continue; }
					this.set(i, vars[i]);
				}
			}
		},

		/**
		 * Get option by key (from named prop)
		 * @param String key
		 */
		get: function(key){
			if(key instanceof String || typeof key === "string"){
				return this.attributes[key];
			}
			return this.attributes;
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
		scripts: [],
		appname: "app",
		path: null,

		/**
		 * Initialize
		 * Get self node, get values from data-* attributes, then load main.js
		 */
		init: function(){
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
		require: function(/* file1, file2, file3 ... */){
			var args, i, files;
			args = arguments;
			files = [];
			for(i=0; i<args.length; i++){
				files.push(this.path + args[i]);
			}
			head.js.apply(head, files);
		},

		/**
		 * Get self node
		 */
		_getSelf: function(){
			var nodes = doc.getElementsByTagName("script");
			return nodes[nodes.length - 1];
		},

		/**
		 * Get data attribute by name
		 * @param String name
		 * @return String
		 */
		_data: function(name){
			return this.node.getAttribute("data-" + name);
		},

		/**
		 * Get directory name from path
		 * @param String path
		 * @return String
		 */
		_dirname: function(path){
			return path.replace(/(#|\?).+$/g, "").replace(/[^\/]+$/, "");
		},

		/**
		 * Run callback for each props
		 * @param Object|Array o
		 * @param Function callback
		 */
		_each: function(o, callback){
			var i;
			for(i in o){
				if(! o.hasOwnProperty(i)){ continue; }
				if(false === callback(o[i], i, o)){ break; }
			}
		}
	};

	head.require = function(){
		loader.require.apply(loader, arguments);
	};

	loader.init();

}(this, document));