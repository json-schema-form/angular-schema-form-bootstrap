Angular Bootstrap Decorator
==========================

For https://github.com/json-schema-form/angular-schema-form

This is the new Bootstrap Decorator! That means a Bootstrap 3 frontend for the Angular Schema Form
project. The former Bootstrap decorator used to be included in the main repo, but has now moved
here.

The big difference is that it now uses new builder methods, for more info on the builder see
[our blog](https://medium.com/@SchemaFormIO/the-new-builder-pt-1-61fadde3c678).

The biggest change for users is that the form no longer contains any `<bootstrap-decorator>` tags
since they are no longer needed.

Install
-------
```sh
npm install angular-schema-form-bootstrap
```
**note** we do not recommend using bower as even the bower team recommend using yarn and webpack now.

The package.json 'main' script is this library alone and unminified so that minification can be handled by webpack or another script bundler.

**Note when using webpack angular-schema-form versions match this repo so ASF 1.0.0-alpha.4 works with Bootstrap 1.0.0-alpha.4**.

If you are unsure, check the bundled version in this repo and see which versions are used as both repo now include a version header.

Look for this:
```js
/*!
 * angular-schema-form
 * @version 1.0.0-alpha.4
 * @date Mon, 17 Apr 2017 08:55:13 GMT
 * @link https://github.com/json-schema-form/angular-schema-form
 * @license MIT
 * Copyright (c) 2014-2017 JSON Schema Form
 */
```

Old versions pre-alpha work with 0.8.13 or ASF, but the alphas should be more stable than those versions with more bugs fixed.

If you include `angular-schema-form-bootstrap-bundled.min.js` you **DO NOT** need to include angular-schema-form, it is now **embedded** within the bundled above file. If you wish to include the files separately you can still use `angular-schema-form-bootstrap.js` or `angular-schema-form-bootstrap.min.js`

Future
------
Using the new builder opens up for a lot of optimization. Primarily we can get rid of a lot of small
watches by using build helpers. For instance, slapping on a `sf-changed` directive *only* if the
form definition has an `onChange` option.

Developer Install
-----------------
```sh
bower install
npm install
```
Then read package.json for the available scripts.
**Note** templates are compiled so the templates script must be run after changes.
