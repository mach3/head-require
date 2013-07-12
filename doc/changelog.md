
# ChangeLog

## 1.4.1 (2013-07-13)

- Update set(), get()
- Reomve last argument `prop` from set() and get() (!!!)

## 1.4.0 (2013-07-05)

- Remove `window.headRequire` method on browser (!!!)
- Deal with renamed head object (by window.head_conf)
- Add `head` option on Grunt task (for renamed head object)
- Update bin/hrc powered by `js-opts`

## 1.3.0 (2013-06-20)

- Rewrite loader and app
- Add `lib` property to app
- Enable to load multiple main.js

## 1.2.1 (2013-06-16)

- Add `head.require` method ( = headRequire)

## 1.2.0 (2013-05-31)

- Add lib/head-require.js as compiler library
- Rewrite task to use library
- Add bin/hrc as command line compiler

## 1.1.0 (2013-05-30)

- Separate loader and app object
- Update grunt task to get options ("uglify", "splitBanners", "banner")
- Change grunt task's interface to use "files"
- Update README

