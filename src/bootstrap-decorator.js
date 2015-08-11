/**
 * TODO: starting form in tabarray, and arrays.
 */
angular.module('schemaForm').config(['schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider',
function(decoratorsProvider, sfBuilderProvider, sfPathProvider) {
  var base = 'decorators/bootstrap/';

  var simpleTransclusion  = sfBuilderProvider.builders.simpleTransclusion;
  var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
  var ngModel        = sfBuilderProvider.builders.ngModel;
  var sfField        = sfBuilderProvider.builders.sfField;

  var array = function(args) {
    var items = args.fieldFrag.querySelector('[schema-form-array-items]');
    if (items) {
      state = angular.copy(args.state);
      state.keyRedaction = state.keyRedaction || 0;
      state.keyRedaction += args.form.key.length + 1;

      // Special case, an array with just one item in it that is not an object.
      // So then we just override the modelValue
      if (args.form.schema && args.form.schema.items &&
          args.form.schema.items.type &&
          args.form.schema.items.type.indexOf('object') === -1 &&
          args.form.schema.items.type.indexOf('array') === -1) {
        console.log('setting state modelValue', args.form);
        var strKey = sfPathProvider.stringify(args.form.key).replace(/"/g, '&quot;') + '[$index]';
        state.modelValue = 'modelArray[$index]'; //(args.state.modelName || 'model') + (strKey[0] !== '[' ? '.' : '') + strKey;
        //state.modelValue = 'model' + sfPathProvider.normalize(args.form.key) + '[$index]'; // 'modelArray[$index]';
      } else {
        state.modelName = 'item';
      }

      var childFrag = args.build(args.form.items, args.path + '.items', state);
      items.appendChild(childFrag);
    }
  };

  var tabs = function(args) {
    if (args.form.tabs && args.form.tabs.length > 0) {
      var tabContent = args.fieldFrag.querySelector('.tab-content');

      args.form.tabs.forEach(function(tab, index) {
        var div = document.createElement('div');
        div.className = 'tab-pane';
        div.setAttribute('ng-disabled', 'form.readonly');
        div.setAttribute('ng-show', 'selected.tab === ' + index);
        div.setAttribute('ng-class', '{active: selected.tab === ' + index + '}');

        var childFrag = args.build(tab.items, args.path + '.tabs[' + index + '].items', args.state);
        div.appendChild(childFrag);
        tabContent.appendChild(div);
      });
    }
  };

  var defaults = [sfField, ngModel, ngModelOptions];
  decoratorsProvider.defineDecorator('bootstrapDecorator', {
    textarea: {template: base + 'textarea.html', builder: defaults},
    fieldset: {template: base + 'fieldset.html', builder: [sfField, simpleTransclusion]},
    array: {template: base + 'array.html', builder: [sfField, ngModelOptions, ngModel, array]},
    tabarray: {template: base + 'tabarray.html', builder: [sfField, ngModelOptions, ngModel, array]},
    tabs: {template: base + 'tabs.html', builder: [sfField, ngModelOptions, ngModel, tabs]},
    section: {template: base + 'section.html', builder: [sfField, simpleTransclusion]},
    conditional: {template: base + 'section.html', builder: [sfField, simpleTransclusion]},
    actions: {template: base + 'actions.html', builder: defaults},
    select: {template: base + 'select.html', builder: defaults},
    checkbox: {template: base + 'checkbox.html', builder: defaults},
    checkboxes: {template: base + 'checkboxes.html', replace: false},
    number: {template: base + 'default.html', builder: defaults},
    password: {template: base + 'default.html', builder: defaults},
    submit: {template: base + 'submit.html', builder: defaults},
    button: {template: base + 'submit.html', builder: defaults},
    radios: {template: base + 'radios.html', builder: defaults},
    'radios-inline': {template: base + 'radios-inline.html', builder: defaults},
    radiobuttons: {template: base + 'radio-buttons.html', builder: defaults},
    help: {template: base + 'help.html', builder: defaults},
    'default': {template: base + 'default.html', builder: defaults}
  }, []);

}])

/* Directives here are WIP, will be moved to main repo or their own files when solidifying */
.directive('sfNewArray', ['sfSelect', 'sfPath', function(sel, sfPath) {
  return {
    scope: false,
    link: function(scope, element, attrs) {
      scope.min = 0;

      scope.modelArray = scope.$eval(attrs.sfNewArray);

      // We need to have a ngModel to hook into validation. It doesn't really play well with
      // arrays though so we both need to trigger validation and onChange.
      // So we watch the value as well. But watching an array can be tricky. We wan't to know
      // when it changes so we can validate,
      var watchFn =  function() {
        //scope.modelArray = modelArray;
        scope.modelArray = scope.$eval(attrs.sfNewArray);
        // validateField method is exported by schema-validate
        if (scope.validateField) {
          scope.validateField();
        }
      };

      var onChangeFn =  function() {
        if (scope.form && scope.form.onChange) {
          if (angular.isFunction(form.onChange)) {
            form.onChange(ctrl.$modelValue, form);
          } else {
            scope.evalExpr(form.onChange, {'modelValue': ctrl.$modelValue, form: form});
          }
        }
      };

      // We need the form definition to make a decision on how we should listen.
      var once = scope.$watch('form', function(form) {
        if (!form) {
          return;
        }

        // Always start with one empty form unless configured otherwise.
        // Special case: don't do it if form has a titleMap
        if (!form.titleMap && form.startEmpty !== true && (!scope.modelArray || scope.modelArray.length === 0)) {
          scope.appendToArray();
        }

        // If we have "uniqueItems" set to true, we must deep watch for changes.
        if (scope.form && scope.form.schema && scope.form.schema.uniqueItems === true) {
          scope.$watch(attrs.sfNewArray, watchFn, true);

          // We still need to trigger onChange though.
          scope.$watch([attrs.sfNewArray, attrs.sfNewArray + '.length'], onChangeFn);

        } else {
          // Otherwise we like to check if the instance of the array has changed, or if something
          // has been added/removed.
          scope.$watchGroup([attrs.sfNewArray, attrs.sfNewArray + '.length'], function() {
            watchFn();
            onChangeFn();
          });
        }

        once();
      });

      scope.appendToArray = function() {

        var empty;

        // Same old add empty things to the array hack :(
        if (scope.form && scope.form.schema) {
          if (scope.form.schema.items) {
            if (scope.form.schema.items.type === 'object') {
              empty = {};
            } else if (scope.form.schema.items.type === 'array') {
              empty = [];
            }
          }
        }

        var model = scope.modelArray;
        if (!model) {
          // Create and set an array if needed.
          var selection = sfPath.parse(attrs.sfNewArray);
          model = [];
          sel(selection, scope, model);
          scope.modelArray = model;
        }
        model.push(empty);

        return model;
      };

      scope.deleteFromArray = function(index) {
        var model = scope.modelArray;
        if (model) {
          model.splice(index, 1);
        }
        return model;
      };
    }
  };
}]);
