// angular-templatecache-loader
let textareaTemplate = require('./bootstrap/textarea.html');
let fieldsetTemplate = require('./bootstrap/fieldset.html');
let arrayTemplate = require('./bootstrap/array.html');
let tabarrayTemplate = require('./bootstrap/tabarray.html');
let tabsTemplate = require('./bootstrap/tabs.html');
let sectionTemplate = require('./bootstrap/section.html');
let actionsTemplate = require('./bootstrap/actions.html');
let selectTemplate = require('./bootstrap/select.html');
let checkboxTemplate = require('./bootstrap/checkbox.html');
let checkboxesTemplate = require('./bootstrap/checkboxes.html');
let submitTemplate = require('./bootstrap/submit.html');
let radiosTemplate = require('./bootstrap/radios.html');
let radiosInlineTemplate = require('./bootstrap/radios-inline.html');
let radiobuttonsTemplate = require('./bootstrap/radio-buttons.html');
let helpTemplate = require('./bootstrap/help.html');
let defaultTemplate = require('./bootstrap/default.html');

angular
  .module('schemaForm')
  .config(bootstrapDecoratorConfig)
  .filter('sfCamelKey', sfCamelKeyFilter);

bootstrapDecoratorConfig.$inject = [
  'schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider', '$injector'
];

function bootstrapDecoratorConfig(
    schemaFormProvider, decoratorsProvider, sfBuilderProvider, sfPathProvider, $injector) {
  var base = 'decorators/bootstrap/';

  var simpleTransclusion  = sfBuilderProvider.builders.simpleTransclusion;
  var ngModelOptions      = sfBuilderProvider.builders.ngModelOptions;
  var ngModel             = sfBuilderProvider.builders.ngModel;
  var sfField             = sfBuilderProvider.builders.sfField;
  var condition           = sfBuilderProvider.builders.condition;
  var array               = sfBuilderProvider.builders.array;
  var numeric             = sfBuilderProvider.builders.numeric;

  // Tabs is so bootstrap specific that it stays here.
  var tabs = function(args) {
    if (args.form.tabs && args.form.tabs.length > 0) {
      var tabContent = args.fieldFrag.querySelector('.tab-content');

      args.form.tabs.forEach(function(tab, index) {
        var evalExpr = '(evalExpr(' + args.path + '.tabs[' + index + ']' +
                       '.condition, { model: model, "arrayIndex": $index}))';
        var div = document.createElement('div');
        div.className = 'tab-pane';
        div.setAttribute('ng-disabled', 'form.readonly');
        div.setAttribute('ng-show', 'selected.tab === ' + index);
        div.setAttribute('ng-class', '{active: selected.tab === ' + index + '}');
        if(!!tab.condition) {
          div.setAttribute('ng-if', evalExpr);
        };

        var childFrag = args.build(tab.items, args.path + '.tabs[' + index + '].items', args.state);
        div.appendChild(childFrag);
        tabContent.appendChild(div);
      });
    }
  };

  var selectPlaceholder = function(args) {
    if (args.form.placeholder) {
      var selectBox = args.fieldFrag.querySelector('select');
      var option = document.createElement('option');
      option.setAttribute('value', '');

      /* We only want the placeholder to show when we do not have a value on the model.
       * We make ngModel builder replace all so we can use $$value$$.
       */
      option.setAttribute('sf-field-model', 'replaceAll');

      /* https://github.com/angular/angular.js/issues/12190#issuecomment-115277040
       * angular > 1.4 does a emptyOption.attr('selected', true)
       * which does not like the ng-if comment.
       */
      if (angular.version.major === 1 && angular.version.minor < 4) {
        option.setAttribute('ng-if', '$$value$$ === undefined');
      } else {
        option.setAttribute('ng-show', '$$value$$ === undefined');
      }

      option.textContent = args.form.placeholder;

      selectBox.appendChild(option);
    }
  };

  var defaults = [sfField, ngModel, ngModelOptions, condition];
  decoratorsProvider.defineDecorator('bootstrapDecorator', {
    textarea: {template: textareaTemplate, builder: defaults},
    fieldset: {template: fieldsetTemplate, builder: [sfField, simpleTransclusion, condition]},
    array: {template: arrayTemplate, builder: [sfField, ngModelOptions, ngModel, array, condition]},
    tabarray: {template: tabarrayTemplate, builder: [sfField, ngModelOptions, ngModel, array, condition]},
    tabs: {template: tabsTemplate, builder: [sfField, ngModelOptions, tabs, condition]},
    section: {template: sectionTemplate, builder: [sfField, simpleTransclusion, condition]},
    conditional: {template: sectionTemplate, builder: [sfField, simpleTransclusion, condition]},
    actions: {template: actionsTemplate, builder: defaults},
    select: {template: selectTemplate, builder: defaults.concat(selectPlaceholder)},
    checkbox: {template: checkboxTemplate, builder: defaults},
    checkboxes: {template: checkboxesTemplate, builder: [sfField, ngModelOptions, ngModel, array, condition]},
    number: {template: defaultTemplate, builder: defaults.concat(numeric)},
    password: {template: defaultTemplate, builder: defaults},
    submit: {template: submitTemplate, builder: defaults},
    button: {template: submitTemplate, builder: defaults},
    radios: {template: radiosTemplate, builder: defaults},
    'radios-inline': {template: radiosInlineTemplate, builder: defaults},
    radiobuttons: {template: radiobuttonsTemplate, builder: defaults},
    help: {template: helpTemplate, builder: defaults},
    'default': {template: defaultTemplate, builder: defaults}
  }, []);
};

/**
 * sfCamelKey Filter
 */
function sfCamelKeyFilter() {
  return function(formKey) {
    if (!formKey) { return ''; };
    var part, i, key;
    key = formKey.slice();
    for (i = 0; i < key.length; i++) {
      part = key[i].toLowerCase().split('');
      if (i && part.length) { part[0] = part[0].toUpperCase(); };
      key[i] = part.join('');
    };
    return key.join('');
  };
};
