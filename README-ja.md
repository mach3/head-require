
# HeadRequire.js


head.jsのリソースローダーをrequire.jsの様に使う為の拡張機能。

## Feature

- "main.js" をscript要素のdata-main属性として渡します
- "main.js"ではリソースの読み込みに`headRequire()`を使用します
- コンパイル用のGruntタスクを同梱しています

## リソースローダー

### インストール

```
$ bower install head-require
```


### 使い方

```html
<script src="scripts/head.js"></script>
<script src="scripts/head-require.js" data-main="scripts/main.js"></script>
```

"head-require.js"を読んでいるscript要素に`data-main`属性でパスを設定しておくと、
そのスクリプトを自動的に読み込みます。

例えば、読み込む "main.js" の中身はこのようになります :

```javascript
headRequire(
	"the/path/to/foojs",
	"the/path/to/bar.js",
	"the/path/to/baz.js"
	"the/path/to/initialize.js"
);
```

リソースへのパスは、"main.js"からの相対パスになります。

`head.js()`では最後の引数にコールバック関数を設定できましたが、
`headRequire()`ではコールバック関数を指定する事ができませんので、
最後に読み込むスクリプト内で初期化する必要があります。

（将来のバージョンでコールバック関数に対応するかもしれません）


## Gruntタスクによるコンパイル

### インストール

```bash
$ npm install head-require
```

### 使い方

この例では、"the/path/to/src/main.js" のコンパイル結果を "the/path/to/dest/main.js" に保存します。

```
module.exports = function(grunt){
	grunt.loadNpmTasks("head-require");
	grunt.initConfig({
		dist : {
			options : {
				uglify : true,
				splitBanners : true,
				banner : "/* my script */\n"
			},
			files : {
				"the/path/to/dest/main.js" : "the/path/to/src/main.js"
			}
		}
	});
};
```

- *注意* : このインターフェイスは v1.1.0 で変更されています
- *注意* : filesオブジェクトの値は、他のGruntタスクのようにArrayを渡すことはできません

### オプション

- uglify : Boolean (false) - uglify.jsで結果を圧縮する・しない
- splitBanners : Boolean (false) - コメントバナーを追加する・しない
- banner : String ("") - コメントバナー文字列


## "app" オブジェクト

head-require.jsは `app` オブジェクトをグローバルオブジェクトのメンバとして宣言します。

### プロパティ

- path : String - "main.js"へのパス
- options : Object ({}) - set()とget()の為のデータコンテナ

```
var jsPath = app.path; // "scripts/"
```

### メソッド

- set(name:String , value:Mixed) : void - `options`のセッター
- get(name:String) : Mixed - `options`のゲッター

```
app.set("foo", "bar");
// or pass object
app.set({foo : "bar"});

app.get("foo"); // "bar"
```

### `app`の名前を変更する

もし `app` の名前を変更したい場合、script要素の"data-appname" 属性で指定できます。

```
<script src="script/head-require.js" data-main="script/main.js" data-appname="myapp"></script>
```

これで `myapp` でアクセスする事ができるようになります。

```
myapp.set("foo", "bar");
```

-----

## Author

mach3

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)
