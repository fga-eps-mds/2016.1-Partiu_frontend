describe('create rides', function() {
  it('should search valid rides', function() {
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
    var newRideButton = element(by.css('#rides'));
    expect(newRideButton).toBeDefined();
    newRideButton.click();

    browser.driver.sleep(5000);



    
  });
});