(function(){

	var app = ({

		node : null, // self node
		main : null, // main script in data-main
		appName : null, // the name of this object in data-namespace
		path : null, // the path of main script

		vars : {},

		init : function(){
			this.node = (function(){
				var nodes = document.getElementsByTagName("script");
				return nodes[nodes.length - 1];
			}());
			this.main = this.node.getAttribute("data-main");
			this.appName = this.node.getAttribute("data-appname") || "app";
			this.path = this.main.split("?")[0].replace(/[^\/]*?$/, "");
			return this;
		},

		/**
		 * require resources, and run callback
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
		},

		/**
		 * Set value to this.vars
		 * 
		 * @param String key
		 * @param Mixed value
		 */
		set : function(key, value){
			this.vars[key] = value;
			return this.get(key);
		},

		/**
		 * Return value from this.vars
		 *
		 * @param String key
		 */
		get : function(key){
			return this.vars[key];
		}

	}).init();
	
	window[app.appName] = app;
	window.headRequire = function(){
		app.require.apply(app, arguments);
	};

	head.js(app.main);
}());