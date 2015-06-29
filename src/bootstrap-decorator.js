
angular.module('schemaForm').config(['schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider',
function(decoratorsProvider, sfBuilderProvider, sfPathProvider) {
  var base = 'decorators/bootstrap/';

  var simpleTransclusion  = sfBuilderProvider.builders.simpleTransclusion;
  var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
  var ngModel        = sfBuilderProvider.builders.ngModel;

  var array = function(args) {
    console.log('array', args);

    var items = args.fieldFrag.querySelector('li.schema-form-array-items');
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
        state.modelValue = 'getModelArray()[$index]'; //(args.state.modelName || 'model') + (strKey[0] !== '[' ? '.' : '') + strKey;
        //state.modelValue = 'model' + sfPathProvider.normalize(args.form.key) + '[$index]'; // 'modelArray[$index]';
      } else {
        state.modelName = 'item';
      }

      var childFrag = args.build(args.form.items, args.path + '.items', state);
      items.appendChild(childFrag);
    }
  };
  var defaults = [ngModel, ngModelOptions];
  decoratorsProvider.defineDecorator('bootstrapDecorator', {
    textarea: {template: base + 'textarea.html', builder: defaults},
    fieldset: {template: base + 'fieldset.html', builder: simpleTransclusion},
    array: {template: base + 'array.html', builder: [ngModelOptions, ngModel, array]},
    tabarray: {template: base + 'tabarray.html', replace: false},
    tabs: {template: base + 'tabs.html', replace: false},
    section: {template: base + 'section.html', builder: simpleTransclusion},
    conditional: {template: base + 'section.html', builder: simpleTransclusion},
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

}]).filter('minLength', function() {
  return function(input, min) {
    input = input || [];
    var diff = min - input.length;
    if (diff > 0) {
      return input.concat(new Array(diff));
    }
    return input;
  };
}).directive('sfNewArray', function() {
  return {
    scope: false,
    link: function(scope, element, attrs) {
      scope.min = 0;
      scope.appendToArray = function() {
        var empty;

        // Same old add empty things to the array hack :(
        if (scope.form && scope.form.schema && scope.form.schema.items) {
          if (scope.form.schema.items.type === 'object') {
            empty = {};
          } else if (scope.form.schema.items.type === 'array') {
            empty = [];
          }
        }

        if (!scope.ngModel.$modelValue) {
          scope.ngModel.$setViewValue([]);
          scope.ngModel.$commitViewValue([]);
        }
        scope.ngModel.$modelValue.push(empty);

      };

      /*scope.$watch('ngModel.$modelValue', function() {
        console.log(scope.ngModel.$modelValue)
        scope.modelArray = scope.ngModel.$modelValue;
      });*/
      scope.getModelArray = function() {
        console.log(scope.ngModel.$modelValue);
        return scope.ngModel.$modelValue;
      };

    }
  };
});
