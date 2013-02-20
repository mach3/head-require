
# HeadRequire.js version 1.0.0


## これはなに

head.js のスクリプトローダーをrequire.js っぽく使うための拡張機能です。

## どこらへんをrequire.jsっぽくしたのか

- script要素のdata-*属性でmain.jsを指定できる
- main.js では headRequire() でリソースをロード出来る
- nodeベースの"なんちゃって"コンパイラが付属

## リソースローダー

```html
<script src="scripts/head.js"></script>
<script src="scripts/head-require.js" data-main="scripts/main.js"></script>
```

まず、head.jsを読み込んでからhead-require.jsを読み込みます。
head-require.js のscript要素に data-main 属性を指定しておくと、そのスクリプトを読みこんでくれます。

main.js の中身は、例えば次のようになります。
リソースのパスは、main.jsからの相対パスとなります。

```js
headRequire(
	"the/path/to/foojs",
	"the/path/to/bar.js",
	"the/path/to/baz.js"
	"the/path/to/initialize.js"
);
```

require.jsの`require()`と違って、引数は配列ではありません。
また、最後の引数はコールバック関数ではありませんので、最後のソースに初期化の処理を書く必要があります。

これはコンパイラで手抜きをする為です。ごめんなさい。


## ソースの結合

nodeで動くコンパイラを用意しましたが、かなり適当な作りなのであまり期待してはいけません。

```bash
$ ./bin/hrc main.js
```

これで、main.js 内でrequire()されているリソースが一塊になって文字列で通常出力されます。
結合する際、区切り文字として ";" が付加されます。

また、第二引数に出力先のファイルを指定できます。

```bash
$ ./bin/hrc main.js dest.js
```

## おまけ機能 : appオブジェクト

head-require.js を読んでおくと、グローバル空間に `app` オブジェクトが生まれ、アクセスすることができます。
例えば `app.path`は main.js が設置されているディレクトリへのパスを格納しています。

```js
var myPath = app.path; // <= "scripts/"
```

### 値の保存・取得

値を共有する機能をつけました。好きなように使ってください。

```js
// セッター
app.set("foo", "bar");

// ゲッター
console.log(app.get("foo")); // <= "bar"
```


### 名前の変更

尚、"app" という名前を変更したい場合は、script要素のdata-appname属性に指定すれば変更できます。

```html
<script src="scripts/head-require.js" data-main="scripts/main.js" data-appname="myapp"></script>
```

そうすることで、"app" が "myapp" として宣言されます。

```javascript
var myPath = myapp.path;
```


## 作者

mach3

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)
