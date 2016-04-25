describe('sortable tabarray', function () {
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
    
    it('form should exist', function () {
        browser.get('http://localhost:8080/examples/sortable-tabarray.html');

        expect(element(by.css('form')).getInnerHtml()).not.toEqual('');
    });
    
    it('should be able order elements in array by dragging the tabs', function () {
        browser.get('http://localhost:8080/examples/sortable-tabarray.html');
        
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