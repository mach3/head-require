/* updated : 2013-06-20 */
myapp.foo=new myapp.lib.Foo,myapp.bar=new myapp.lib.Bar,myapp.baz=new myapp.lib.Baz;var log=function(a){var p=document.getElementById("log");p.innerText+=a+"\n"};log("Foo: "+(myapp.foo instanceof myapp.lib.Foo).toString()),log("Bar: "+(myapp.bar instanceof myapp.lib.Bar).toString()),log("Baz: "+(myapp.baz instanceof myapp.lib.Baz).toString());