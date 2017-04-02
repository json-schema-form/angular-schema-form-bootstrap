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
bower install angular-schema-form-bootstrap
```
or
```sh
npm install angular-schema-form-bootstrap
```

The package.json 'main' script is this library alone and unminified so that minification can be handled by webpack or another script bundler.
**Note that angular-schema-form >= 1.0.0-alpha.1 is needed in that case**.

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
