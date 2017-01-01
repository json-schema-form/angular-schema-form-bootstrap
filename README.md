Angular Bootstrap Decorator
==========================

For https://github.com/Textalk/angular-schema-form

This is the new Bootstrap Decorator! That means a Bootstrap 3 frontend for the Angular Schema Form
project. The former Bootstrap decorator used to be included in the main repo, but has now moved
here.

The big difference is that it now uses the new builder in, for more info on the builder see
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
And then include `angular-schema-form-bootstrap-bundled.min.js`. Note that angular-schema-form >= 1.0.0-alpha.1 is needed.

You **DO NOT** need to include angular-schema-form with this version, it is now embedded within the above file. If you wish to include the files separately you can still use `angular-schema-form-bootstrap.min.js`

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
