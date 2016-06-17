describe('create rides', function() {  
  it('should show valid rides', function() {
    browser.get('http://localhost:8100');
    var fbButton = element(by.buttonText("Login com o facebook"));
    fbButton.click();
    browser.getAllWindowHandles().then(function(handles) {
      browser.switchTo().window(handles[1]);
      var emailField = browser.driver.findElement(by.id('email'));
      var passField = browser.driver.findElement(by.id('pass'));

      emailField.sendKeys('hsghwxh_sidhuescu_1465645079@tfbnw.net');
      passField.sendKeys('partiu123');

      var loginSubmitButton = browser.driver.findElement(by.id('u_0_2'));
      loginSubmitButton.click();
      // sleep to wait for facebook and firebase response
      browser.driver.sleep(5000);
      browser.switchTo().window(handles[0]);
    });
    
    var openMenuButton = element(by.css('.nav-bar-block[nav-bar=active]'));
    expect(openMenuButton).toBeDefined();
    openMenuButton.click();
    openMenuButton = openMenuButton.element(by.css('.main-menu-button'));
    openMenuButton.click();
    var newRideButton = element(by.css('#profile'));
    expect(newRideButton).toBeDefined();
    newRideButton.click();
    browser.driver.sleep(5000);

    var selectVehicleButton = element(by.css('a'));
    expect(selectVehicleButton).toBeDefined();
    selectVehicleButton.click();

    browser.driver.sleep(5000); 
    expect(element(by.css('#car_model'))).toBeDefined();
    element(by.css('#car_model')).sendKeys('Hilux toda invocada');
    expect(element(by.css('#color'))).toBeDefined();
    element(by.css('#color')).sendKeys('Prata');
    expect(element(by.css('#description'))).toBeDefined();
    element(by.css('#description')).sendKeys('Para dar cavalinho de pau pelo Gama');
    browser.driver.sleep(5000);
    var selectSave = element(by.css('input'));
    expect(selectSave).toBeDefined();
    selectSave.click();

    // sleep to check the whole result
    browser.driver.sleep(5000);

    expect(element(by.css('#car_model'))).toBeDefined();
    expect(element(by.css('#color'))).toBeDefined();
    expect(element(by.css('#description'))).toBeDefined();

    });
});