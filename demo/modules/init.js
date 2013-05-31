(function(){

	var log = document.getElementById("log");
	log.innerHTML = [
		myapp.get("foo"),
		myapp.get("bar"),
		myapp.get("baz")()
	].join("\n");

}());

