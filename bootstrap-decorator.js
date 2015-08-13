angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("decorators/bootstrap/actions-trcl.html","<div class=\"btn-group schema-form-actions {{form.htmlClass}}\" ng-transclude=\"\"></div>");
$templateCache.put("decorators/bootstrap/actions.html","<div class=\"btn-group schema-form-actions {{form.htmlClass}}\"><input ng-repeat-start=\"item in form.items\" type=\"submit\" class=\"btn {{ item.style || \'btn-default\' }} {{form.fieldHtmlClass}}\" value=\"{{item.title}}\" ng-if=\"item.type === \'submit\'\"> <button ng-repeat-end=\"\" class=\"btn {{ item.style || \'btn-default\' }} {{form.fieldHtmlClass}}\" type=\"button\" ng-disabled=\"form.readonly\" ng-if=\"item.type !== \'submit\'\" ng-click=\"buttonClick($event,item)\"><span ng-if=\"item.icon\" class=\"{{item.icon}}\"></span>{{item.title}}</button></div>");
$templateCache.put("decorators/bootstrap/array.html","<div class=\"schema-form-array {{form.htmlClass}}\" sf-field-model=\"sf-new-array\" sf-new-array=\"\"><label class=\"control-label\" ng-show=\"showTitle()\">{{ form.title }}</label><ol class=\"list-group\" ui-sortable=\"\"><li class=\"list-group-item {{form.fieldHtmlClass}}\" schema-form-array-items=\"\" sf-field-model=\"ng-repeat\" ng-repeat=\"item in $$value$$ track by $index\"><button ng-hide=\"form.readonly || form.remove === null\" ng-click=\"deleteFromArray($index)\" ng-disabled=\"form.schema.minItems >= modelArray.length\" style=\"position: relative; z-index: 20;\" type=\"button\" class=\"close pull-right\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button></li></ol><div class=\"clearfix\" style=\"padding: 15px;\" ng-model=\"modelArray\" schema-validate=\"form\"><div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\" ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div><button ng-hide=\"form.readonly || form.add === null\" ng-click=\"appendToArray()\" ng-disabled=\"form.schema.maxItems <= modelArray.length\" type=\"button\" class=\"btn {{ form.style.add || \'btn-default\' }} pull-right\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</button></div></div>");
$templateCache.put("decorators/bootstrap/checkbox.html","<div class=\"checkbox schema-form-checkbox {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><label class=\"{{form.labelHtmlClass}}\"><input type=\"checkbox\" sf-changed=\"form\" ng-disabled=\"form.readonly\" sf-field-model=\"\" schema-validate=\"form\" class=\"{{form.fieldHtmlClass}}\" name=\"{{form.key.slice(-1)[0]}}\"> <span ng-bind-html=\"form.title\"></span></label><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("decorators/bootstrap/checkboxes.html","<div sf-field-model=\"sf-new-array\" sf-new-array=\"\" class=\"form-group schema-form-checkboxes {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label><div class=\"checkbox\" ng-repeat=\"val in titleMapValues track by $index\"><label><input type=\"checkbox\" ng-disabled=\"form.readonly\" sf-changed=\"form\" class=\"{{form.fieldHtmlClass}}\" ng-model=\"titleMapValues[$index]\" name=\"{{form.key.slice(-1)[0]}}\"> <span ng-bind-html=\"form.titleMap[$index].name\"></span></label></div><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("decorators/bootstrap/default.html","<div class=\"form-group schema-form-{{form.type}} {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }\"><label class=\"control-label {{form.labelHtmlClass}}\" ng-class=\"{\'sr-only\': !showTitle()}\" for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label> <input ng-if=\"!form.fieldAddonLeft && !form.fieldAddonRight\" ng-show=\"form.key\" type=\"{{form.type}}\" step=\"any\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" sf-field-model=\"\" ng-disabled=\"form.readonly\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\" aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\"><div ng-if=\"form.fieldAddonLeft || form.fieldAddonRight\" ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\"><span ng-if=\"form.fieldAddonLeft\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonLeft\"></span> <input ng-show=\"form.key\" type=\"{{form.type}}\" step=\"any\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" sf-field-model=\"\" ng-disabled=\"form.readonly\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\" aria-describedby=\"{{form.key.slice(-1)[0] + \'Status\'}}\"> <span ng-if=\"form.fieldAddonRight\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonRight\"></span></div><span ng-if=\"form.feedback !== false\" class=\"form-control-feedback\" ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\" aria-hidden=\"true\"></span> <span ng-if=\"hasError() || hasSuccess()\" id=\"{{form.key.slice(-1)[0] + \'Status\'}}\" class=\"sr-only\">{{ hasSuccess() ? \'(success)\' : \'(error)\' }}</span><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("decorators/bootstrap/fieldset.html","<fieldset ng-disabled=\"form.readonly\" class=\"schema-form-fieldset {{form.htmlClass}}\"><legend ng-class=\"{\'sr-only\': !showTitle() }\">{{ form.title }}</legend><div class=\"help-block\" ng-show=\"form.description\" ng-bind-html=\"form.description\"></div></fieldset>");
$templateCache.put("decorators/bootstrap/help.html","<div class=\"helpvalue schema-form-helpvalue {{form.htmlClass}}\" ng-bind-html=\"form.helpvalue\"></div>");
$templateCache.put("decorators/bootstrap/radio-buttons.html","<div class=\"form-group schema-form-radiobuttons {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><div><label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label></div><div class=\"btn-group\"><label sf-field-model=\"replaceAll\" class=\"btn {{ (item.value === $$value$$) ? form.style.selected || \'btn-default\' : form.style.unselected || \'btn-default\'; }}\" ng-class=\"{ active: item.value === $$value$$ }\" ng-repeat=\"item in form.titleMap\"><input type=\"radio\" class=\"{{form.fieldHtmlClass}}\" sf-changed=\"form\" style=\"display: none;\" ng-disabled=\"form.readonly\" sf-field-model=\"\" schema-validate=\"form\" ng-value=\"item.value\" name=\"{{form.key.join(\'.\')}}\"> <span ng-bind-html=\"item.name\"></span></label></div><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("decorators/bootstrap/radios-inline.html","<div class=\"form-group schema-form-radios-inline {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label><div><label class=\"radio-inline\" ng-repeat=\"item in form.titleMap\"><input type=\"radio\" class=\"{{form.fieldHtmlClass}}\" sf-changed=\"form\" ng-disabled=\"form.readonly\" sf-field-model=\"\" schema-validate=\"form\" ng-value=\"item.value\" name=\"{{form.key.join(\'.\')}}\"> <span ng-bind-html=\"item.name\"></span></label></div><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("decorators/bootstrap/radios.html","<div class=\"form-group schema-form-radios {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label><div class=\"radio\" ng-repeat=\"item in form.titleMap\"><label><input type=\"radio\" class=\"{{form.fieldHtmlClass}}\" sf-changed=\"form\" ng-disabled=\"form.readonly\" sf-field-model=\"\" schema-validate=\"form\" ng-value=\"item.value\" name=\"{{form.key.join(\'.\')}}\"> <span ng-bind-html=\"item.name\"></span></label></div><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("decorators/bootstrap/section.html","<div class=\"schema-form-section {{form.htmlClass}}\"></div>");
$templateCache.put("decorators/bootstrap/select.html","<div class=\"form-group {{form.htmlClass}} schema-form-select\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false}\"><label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label><select sf-field-model=\"\" ng-disabled=\"form.readonly\" sf-changed=\"form\" class=\"form-control {{form.fieldHtmlClass}}\" schema-validate=\"form\" ng-options=\"item.value as item.name group by item.group for item in form.titleMap\" name=\"{{form.key.slice(-1)[0]}}\"></select><div class=\"help-block\" sf-message=\"form.description\"></div></div>");
$templateCache.put("decorators/bootstrap/submit.html","<div class=\"form-group schema-form-submit {{form.htmlClass}}\"><input type=\"submit\" class=\"btn {{ form.style || \'btn-primary\' }} {{form.fieldHtmlClass}}\" value=\"{{form.title}}\" ng-disabled=\"form.readonly\" ng-if=\"form.type === \'submit\'\"> <button class=\"btn {{ form.style || \'btn-default\' }}\" type=\"button\" ng-click=\"buttonClick($event,form)\" ng-disabled=\"form.readonly\" ng-if=\"form.type !== \'submit\'\"><span ng-if=\"form.icon\" class=\"{{form.icon}}\"></span> {{form.title}}</button></div>");
$templateCache.put("decorators/bootstrap/tabarray.html","<div ng-init=\"selected = { tab: 0 }\" ng-model=\"modelArray\" schema-validate=\"form\" sf-field-model=\"sf-new-array\" sf-new-array=\"\" class=\"clearfix schema-form-tabarray schema-form-tabarray-{{form.tabType || \'left\'}} {{form.htmlClass}}\"><div ng-if=\"!form.tabType || form.tabType !== \'right\'\" ng-class=\"{\'col-xs-3\': !form.tabType || form.tabType === \'left\'}\"><ul class=\"nav nav-tabs\" ng-class=\"{ \'tabs-left\': !form.tabType || form.tabType === \'left\'}\"><li sf-field-model=\"ng-repeat\" ng-repeat=\"item in $$value$$ track by $index\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{interp(form.title,{\'$index\':$index, value: item}) || $index}}</a></li><li ng-hide=\"form.readonly\" ng-disabled=\"form.schema.maxItems <= modelArray.length\" ng-click=\"$event.preventDefault() || (selected.tab = appendToArray().length - 1)\"><a href=\"#\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</a></li></ul></div><div ng-class=\"{\'col-xs-9\': !form.tabType || form.tabType === \'left\' || form.tabType === \'right\'}\"><div class=\"tab-content {{form.fieldHtmlClass}}\"><div class=\"tab-pane clearfix tab{{selected.tab}} index{{$index}}\" sf-field-model=\"ng-repeat\" ng-repeat=\"item in $$value$$ track by $index\" ng-show=\"selected.tab === $index\" ng-class=\"{active: selected.tab === $index}\"><div schema-form-array-items=\"\"></div><button ng-hide=\"form.readonly\" ng-click=\"selected.tab = deleteFromArray($index).length - 1\" ng-disabled=\"form.schema.minItems >= modelArray.length\" type=\"button\" class=\"btn {{ form.style.remove || \'btn-default\' }} pull-right\"><i class=\"glyphicon glyphicon-trash\"></i> {{ form.remove || \'Remove\'}}</button></div><div class=\"help-block\" ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\" ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div></div></div></div><div ng-if=\"form.tabType === \'right\'\" class=\"col-xs-3\"><ul class=\"nav nav-tabs tabs-right\"><li sf-field-model=\"ng-repeat\" ng-repeat=\"item in $$value$$ track by $index\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{interp(form.title,{\'$index\':$index, value: item}) || $index}}</a></li><li ng-hide=\"form.readonly\" ng-disabled=\"form.schema.maxItems <= modelArray.length\" ng-click=\"$event.preventDefault() || (selected.tab = appendToArray().length - 1)\"><a href=\"#\"><i class=\"glyphicon glyphicon-plus\"></i> {{ form.add || \'Add\'}}</a></li></ul></div>");
$templateCache.put("decorators/bootstrap/tabs.html","<div ng-init=\"selected = { tab: 0 }\" class=\"schema-form-tabs {{form.htmlClass}}\"><ul class=\"nav nav-tabs\"><li ng-repeat=\"tab in form.tabs\" ng-disabled=\"form.readonly\" ng-click=\"$event.preventDefault() || (selected.tab = $index)\" ng-class=\"{active: selected.tab === $index}\"><a href=\"#\">{{ tab.title }}</a></li></ul><div class=\"tab-content {{form.fieldHtmlClass}}\"></div></div>");
$templateCache.put("decorators/bootstrap/textarea.html","<div class=\"form-group has-feedback {{form.htmlClass}} schema-form-textarea\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\"><label class=\"{{form.labelHtmlClass}}\" ng-class=\"{\'sr-only\': !showTitle()}\" for=\"{{form.key.slice(-1)[0]}}\">{{form.title}}</label> <textarea ng-if=\"!form.fieldAddonLeft && !form.fieldAddonRight\" class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" ng-disabled=\"form.readonly\" sf-field-model=\"\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\"></textarea><div ng-if=\"form.fieldAddonLeft || form.fieldAddonRight\" ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\"><span ng-if=\"form.fieldAddonLeft\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonLeft\"></span> <textarea class=\"form-control {{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" sf-changed=\"form\" placeholder=\"{{form.placeholder}}\" ng-disabled=\"form.readonly\" sf-field-model=\"\" schema-validate=\"form\" name=\"{{form.key.slice(-1)[0]}}\"></textarea> <span ng-if=\"form.fieldAddonRight\" class=\"input-group-addon\" ng-bind-html=\"form.fieldAddonRight\"></span></div><span class=\"help-block\" sf-message=\"form.description\"></span></div>");}]);
angular.module('schemaForm').config(['schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider',
function(decoratorsProvider, sfBuilderProvider, sfPathProvider) {
  var base = 'decorators/bootstrap/';

  var simpleTransclusion  = sfBuilderProvider.builders.simpleTransclusion;
  var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
  var ngModel        = sfBuilderProvider.builders.ngModel;
  var sfField        = sfBuilderProvider.builders.sfField;

  var condition = function(args) {
    // Do we have a condition? Then we slap on an ng-if on all children,
    // but be nice to existing ng-if.
    if (args.form.condition) {
      var evalExpr = 'evalExpr(' + args.path + '.contidion, { model: model, "arrayIndex": $index})';
      if (args.form.key) {
        var strKey = sfPathProvider.stringify(args.form.key);
        evalExpr = 'evalExpr(' + args.path + '.condition,{ model: model, "arrayIndex": $index, ' +
                   '"modelValue": model' + (strKey[0] === '[' ? '' : '.') + strKey + '})';
      }

      var children = args.fieldFrag.children;
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var ngIf = child.getAttribute('ng-if');
        child.setAttribute(
          'ng-if',
          ngIf ?
          '(' + ngIf +
          ') || (' + evalExpr + ')'
          : evalExpr
        );
      }
    }
  };

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

  var defaults = [sfField, ngModel, ngModelOptions, condition];
  decoratorsProvider.defineDecorator('bootstrapDecorator', {
    textarea: {template: base + 'textarea.html', builder: defaults},
    fieldset: {template: base + 'fieldset.html', builder: [sfField, simpleTransclusion, condition]},
    array: {template: base + 'array.html', builder: [sfField, ngModelOptions, ngModel, array, condition]},
    tabarray: {template: base + 'tabarray.html', builder: [sfField, ngModelOptions, ngModel, array, condition]},
    tabs: {template: base + 'tabs.html', builder: [sfField, ngModelOptions, tabs, condition]},
    section: {template: base + 'section.html', builder: [sfField, simpleTransclusion, condition]},
    conditional: {template: base + 'section.html', builder: [sfField, simpleTransclusion, condition]},
    actions: {template: base + 'actions.html', builder: defaults},
    select: {template: base + 'select.html', builder: defaults},
    checkbox: {template: base + 'checkbox.html', builder: defaults},
    checkboxes: {template: base + 'checkboxes.html', builder: [sfField, ngModelOptions, ngModel, array]},
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

        // Title Map handling
        // If form has a titleMap configured we'd like to enable looping over
        // titleMap instead of modelArray, this is used for intance in
        // checkboxes. So instead of variable number of things we like to create
        // a array value from a subset of values in the titleMap.
        // The problem here is that ng-model on a checkbox doesn't really map to
        // a list of values. This is here to fix that.
        if (form.titleMap && form.titleMap.length > 0) {
          scope.titleMapValues = [];

          // We watch the model for changes and the titleMapValues to reflect
          // the modelArray
          var updateTitleMapValues = function(arr) {
            scope.titleMapValues = [];
            arr = arr || [];

            form.titleMap.forEach(function(item) {
              scope.titleMapValues.push(arr.indexOf(item.value) !== -1);
            });
          };
          //Catch default values
          updateTitleMapValues(scope.modelArray);

          // TODO: Refactor and see if we can get rid of this watch by piggy backing on the
          // validation watch.
          scope.$watchCollection('modelArray', updateTitleMapValues);

          //To get two way binding we also watch our titleMapValues
          scope.$watchCollection('titleMapValues', function(vals, old) {
            if (vals && vals !== old) {
              var arr = scope.modelArray;

              // Apparently the fastest way to clear an array, readable too.
              // http://jsperf.com/array-destroy/32
              while (arr.length > 0) {
                arr.pop();
              }
              form.titleMap.forEach(function(item, index) {
                if (vals[index]) {
                  arr.push(item.value);
                }
              });

              // Time to validate the rebuilt array.
              // validateField method is exported by schema-validate
              if (scope.validateField) {
                scope.validateField();
              }
            }
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
