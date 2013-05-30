
console.log(
	myapp.get("foo") === "foofoo",
	myapp.get("bar") === "barbar",
	myapp.get("baz")() === "bazbaz",
	myapp.path === "./scripts/"
);
