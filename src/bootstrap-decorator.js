angular.module('schemaForm').config(['schemaFormDecoratorsProvider', 'sfBuilderProvider',
function(decoratorsProvider, sfBuilderProvider) {
  var base = 'decorators/bootstrap/';

  var simpleBuilder  = sfBuilderProvider.builders.si;
  var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
  var ngModel        = sfBuilderProvider.builders.ngModel;

  var array = function(args) {
    console.log('array', args)
    var items = args.fieldFrag.querySelector('li.schema-form-array-items');
    if (items) {
      args.state.keyRedaction = args.state.keyRedaction || 0;
      args.state.keyRedaction += args.form.key.length + 1;

      var childFrag = args.build(args.form.items, args.path + '.items', args.state);
      items.appendChild(childFrag);
    }
  };
  var defaults = [ngModel, ngModelOptions];
  decoratorsProvider.defineDecorator('bootstrapDecorator', {
    textarea: {template: base + 'textarea.html', builder: defaults},
    fieldset: {template: base + 'fieldset.html', builder: simpleBuilder},
    array: {template: base + 'array.html', builder: [ngModel, ngModelOptions, array]},
    tabarray: {template: base + 'tabarray.html', replace: false},
    tabs: {template: base + 'tabs.html', replace: false},
    section: {template: base + 'section.html', builder: simpleBuilder},
    conditional: {template: base + 'section.html', builder: simpleBuilder},
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

}]);
