var log = function(str){
	var node = document.getElementById("log");
	node.innerText += str + "\n";
};

log("Foo: " + (myapp.foo instanceof myapp.lib.Foo).toString());
log("Bar: " + (myapp.bar instanceof myapp.lib.Bar).toString());
log("Baz: " + (myapp.baz instanceof myapp.lib.Baz).toString());
