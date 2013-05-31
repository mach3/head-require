(function(global){

	var loader, app;

	/**
	 * Loader Object
	 * -------------
	 */
	loader = ({

		node : null, // self node
		main : null, // main script in data-main
		namespace : null, // the name of namespace
		path : null, // the path of main script

		vars : {},

		init : function(){
			this.node = (function(){
				var nodes = document.getElementsByTagName("script");
				return nodes[nodes.length - 1];
			}());
			this.main = this.node.getAttribute("data-main");
			this.namespace = this.node.getAttribute("data-appname") || "app";
			this.path = this.main.split("?")[0].replace(/[^\/]*?$/, "");
			return this;
		},

		/**
		 * require resources 
		 *
		 * @example
		 *   require("foo.js", "bar.js", "baz.js", ...);
		 */
		require : function(){
			var deps, i;
			
			deps = arguments;
			for(i=0; i<deps.length; i++){
				deps[i] = this.path + deps[i];
			}
			head.js.apply(head, deps);
		}

	}).init();

	/**
	 * App object
	 * ----------
	 */
	app = {

		path : loader.path,
		options : {},

		/**
		 * Set value to options
		 * `prop` is property name of options object ("options" as default)
		 * 
		 * @param String|Object key
		 * @param Mixed value (optional)
		 * @param String prop (optional)
		 */
		set : function(key, value, prop){
			var i, data;

			prop = prop || "options";
			if(key instanceof String || typeof key === "string"){
				this[prop][key] = value;
			} else {
				data = key;
				for(i in data){
					if(data.hasOwnProperty(i)){
						this.set(i, data[i]);
					}
				}
			}
		},

		/**
		 * Get value from options
		 *
		 * @param String key
		 * @param String prop
		 */
		get : function(key, prop){
			prop = prop || "options";
			if(this[prop].hasOwnProperty(key)){
				return this[prop][key];
			}
		}

	};

	global[loader.namespace] = app;
	global.headRequire = function(){
		loader.require.apply(loader, arguments);
	};

	head.js(loader.main);

}(this));