
(function(){

	var log, vars;

	// log
	log = function(str){
		var node = document.getElementById("log");
		node.innerText += str + "\n";
	};

	log("Foo: " + (myapp.foo instanceof myapp.lib.Foo).toString());
	log("Bar: " + (myapp.bar instanceof myapp.lib.Bar).toString());
	log("Baz: " + (myapp.baz instanceof myapp.lib.Baz).toString());

	log("-----");

	// setter / getter
	myapp.set("name", "head-require");
	myapp.set({
		"from": "Feb 2013",
		"require": "head.js <http://headjs.com>",
		"author": "mach3 <http://github.com/mach3>"
	});
	vars = myapp.get();
	for(var key in vars){
		if(vars.hasOwnProperty(key)){
			log(key + ": " + vars[key]);
		}
	}

}());
