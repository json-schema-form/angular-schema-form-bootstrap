describe('tab array', function () {
  it('form should exist', function () {
    browser.get('http://localhost:8080/examples/bootstrap-example.html');
    
    element(by.css('#selectTest')).all(by.cssContainingText('option', 'Tab Array')).first().click().then(function() {
      expect(element(by.css('form.ng-valid-schema-form')).getInnerHtml()).not.toEqual('');
    });
  });

  it('add link should be hidden', function () {
    browser.get('http://localhost:8080/examples/bootstrap-example.html');

    /* select the add disabled example */
    element(by.css('#selectTest')).element(by.cssContainingText('option', 'Tab Array: Add Disabled')).click().then(function() {

      /* Add link should not be displayed */
      var tabs = element.all(by.css('.nav-tabs li'));
      expect(tabs.get(0).isDisplayed()).toBeTruthy();
      expect(tabs.get(1).isDisplayed()).toBeFalsy();
      
      var addLink = element.all(by.partialLinkText('Add'));
      expect(addLink.count()).toBe(0);
      
      /*** control tests ***/
      /* Remove button should be displayed */
      var removeButton = element.all(by.partialButtonText('Remove')).get(0);
      expect(removeButton.isDisplayed()).toBeTruthy();
    });
  });

  it('remove button should be hidden', function () {
    browser.get('http://localhost:8080/examples/bootstrap-example.html');

    /* select the remove disabled example */
    element(by.css('#selectTest')).element(by.cssContainingText('option', 'Tab Array: Remove Disabled')).click().then(function() {
      
      /* Remove button should not be displayed */
      var removeButton = element.all(by.partialButtonText('Remove')).get(0);
      expect(removeButton.isDisplayed()).toBeFalsy();
      
      /*** control tests ***/
      /* Add link should not be displayed */
      var tabs = element.all(by.css('.nav-tabs li'));
      expect(tabs.get(0).isDisplayed()).toBeTruthy();
      expect(tabs.get(1).isDisplayed()).toBeTruthy();
      
      var addLink = element.all(by.partialLinkText('Add'));
      expect(addLink.count()).toBe(1);
    });
  });

  it('should be able order elements in array by dragging the tabs', function () {
    browser.get('http://localhost:8080/examples/bootstrap-example.html');
    
    function checkDragDrop(i) {
      browser.driver.wait(protractor.until.elementLocated(by.xpath("//ol/li[1]/a[text()='My name is: Name " + (i + 1) +"']")), 10000);
      expect(element.all(by.css('.nav-tabs li a')).get(0).getText()).toBe('My name is: Name ' + (i + 1));
    }
    
    function populateTab(i) {
      browser.driver.wait(protractor.until.elementLocated(by.css('.tab-pane.active.index' + i)), 5000);
      
      browser.driver.wait(protractor.until.elementLocated(by.css('.tab-pane.index' + i + ' div.nickField > input')), 5000);
      input = element.all(by.css('.tab-pane.index' + i + '  div.nickField > input')).first();
      input.sendKeys('Nickname ' + i);
      
      browser.driver.wait(protractor.until.elementLocated(by.css('.tab-pane.index' + i + ' div.nameField > input')), 5000);
      input = element.all(by.css('.tab-pane.index' + i + ' div.nameField > input')).first();
      input.sendKeys('Name ' + i);
      
      browser.driver.wait(protractor.until.elementLocated(by.linkText('My name is: Name ' + i)), 10000); 
    }
    
    /* select the sortable example */
    element(by.css('#selectTest')).element(by.cssContainingText('option', 'Tab Array: Sortable')).click().then(function() {
    
      var i;
      var elementsToAdd = 9;

      /* the array starts with 1 element, populate the first element */
      populateTab(0);
      
      /* add elements and populate */
      for (i = 1; i <= elementsToAdd; i++) {
          var tabLink = element.all(by.css('.glyphicon-plus'));
          tabLink.click().then(populateTab(i));
      }

      /* continue when all tabs have been populated*/
      browser.driver.wait(protractor.until.elementLocated(by.linkText('My name is: Name ' + elementsToAdd)), 10000);
      
      /* check the number of tabs */
      var tabs = element.all(by.css('.nav-tabs li'));
      expect(tabs.count()).toBe(elementsToAdd + 2); //Extra 1 for the "+ Add" link

      /* drag the tabs into reverse order (descending) */
      for (i = 0; i < elementsToAdd; i++) {
          var draggable_element = element.all(by.css('.nav-tabs li')).get(0);
          var target_element = element.all(by.css('.nav-tabs li')).get(elementsToAdd - i);
          expect(draggable_element.isPresent()).toEqual(true);
          expect(target_element.isPresent()).toEqual(true);
          browser.actions().dragAndDrop(draggable_element, target_element).perform().then(checkDragDrop(i));
      }
      
      /* final check of the reverse ordered tabs */
      for (i = 0; i <= elementsToAdd; i++) {
          expect(element.all(by.css('.nav-tabs li a')).get(i).getText()).toBe('My name is: Name ' + (elementsToAdd - i));
      }
    });
  });
});
