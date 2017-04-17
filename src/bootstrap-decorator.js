// ngtemplate-loader embeds the html on build
import actionsTemplate from './bootstrap/actions.html';
import arrayTemplate from './bootstrap/array.html';
import checkboxTemplate from './bootstrap/checkbox.html';
import checkboxesTemplate from './bootstrap/checkboxes.html';
import defaultTemplate from './bootstrap/default.html';
import fieldsetTemplate from './bootstrap/fieldset.html';
import helpTemplate from './bootstrap/help.html';
import radiobuttonsTemplate from './bootstrap/radio-buttons.html';
import radiosTemplate from './bootstrap/radios.html';
import radiosInlineTemplate from './bootstrap/radios-inline.html';
import sectionTemplate from './bootstrap/section.html';
import selectTemplate from './bootstrap/select.html';
import submitTemplate from './bootstrap/submit.html';
import tabarrayTemplate from './bootstrap/tabarray.html';
import tabsTemplate from './bootstrap/tabs.html';
import textareaTemplate from './bootstrap/textarea.html';

angular
  .module('schemaForm')
  .config(bootstrapDecoratorConfig);

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
    actions: {template: actionsTemplate, builder: defaults},
    array: {template: arrayTemplate, builder: [ sfField, ngModelOptions, ngModel, array, condition ]},
    button: {template: submitTemplate, builder: defaults},
    checkbox: {template: checkboxTemplate, builder: defaults},
    checkboxes: {template: checkboxesTemplate, builder: [ sfField, ngModelOptions, ngModel, array, condition ]},
    conditional: {template: sectionTemplate, builder: [ sfField, simpleTransclusion, condition ]},
    'default': {template: defaultTemplate, builder: defaults},
    fieldset: {template: fieldsetTemplate, builder: [ sfField, simpleTransclusion, condition ]},
    help: {template: helpTemplate, builder: defaults},
    number: {template: defaultTemplate, builder: defaults.concat(numeric)},
    password: {template: defaultTemplate, builder: defaults},
    radios: {template: radiosTemplate, builder: defaults},
    'radios-inline': {template: radiosInlineTemplate, builder: defaults},
    radiobuttons: {template: radiobuttonsTemplate, builder: defaults},
    section: {template: sectionTemplate, builder: [ sfField, simpleTransclusion, condition ]},
    select: {template: selectTemplate, builder: [ selectPlaceholder ].concat(defaults)},
    submit: {template: submitTemplate, builder: defaults},
    tabarray: {template: tabarrayTemplate, builder: [ sfField, ngModelOptions, ngModel, array, condition ]},
    tabs: {template: tabsTemplate, builder: [ sfField, ngModelOptions, tabs, condition ]},
    textarea: {template: textareaTemplate, builder: defaults},
  }, []);
};
