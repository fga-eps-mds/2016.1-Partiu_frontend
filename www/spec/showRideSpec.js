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
      browser.driver.sleep(20000);
      browser.switchTo().window(handles[0]);
    });
    var openMenuButton = element(by.css('.nav-bar-block[nav-bar=active]'));
    expect(openMenuButton).toBeDefined();
    openMenuButton.click();
    openMenuButton = openMenuButton.element(by.css('.main-menu-button'));
    openMenuButton.click();
    var newRideButton = element(by.css('#new-ride'));
    expect(newRideButton).toBeDefined();
    newRideButton.click();

    browser.driver.sleep(5000);
    expect(element(by.css('#title'))).toBeDefined();
    element(by.css('#title')).sendKeys('RIDE TITLE 00X');
    expect(element(by.css('#origin'))).toBeDefined();
    element(by.css('#origin')).sendKeys('Jardim do Inga, Luziânia - GO, Brasil');
    expect(element(by.css('#destination'))).toBeDefined();
    element(by.css('#destination')).sendKeys('UnB Gama - Setor Leste, Brasília - DF, Brasil');
    browser.driver.sleep(5000);
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('#date[name=date]')).getWebElement());
    expect(element(by.css('#date[name=date]'))).toBeDefined();
    element(by.css('#date[name=date]')).sendKeys('2016-08-08');
    expect(element(by.css('#departure_time'))).toBeDefined();
    element(by.css('#departure_time')).sendKeys('08h');
    expect(element(by.css('#return_time'))).toBeDefined();
    element(by.css('#return_time')).sendKeys('16h');
    browser.executeScript("arguments[0].scrollIntoView();", element(by.css('#description')).getWebElement());
    expect(element(by.css('#description'))).toBeDefined();
    element(by.css('#description')).sendKeys('THE BEST RIDE THAT EVER OCCURRED');
    expect(element(by.css('#total-seats-4'))).toBeDefined();
    element(by.css('#total-seats-4')).click();
    expect(element(by.css('#submit-ride'))).toBeDefined();
    browser.driver.sleep(10000);
    element(by.css('#submit-ride')).click();

    // sleep to check the whole result
    browser.driver.sleep(5000);

    expect(element(by.css('#destination'))).toBeDefined();
    expect(element(by.css('#origin'))).toBeDefined();
    expect(element(by.css('#total-seats'))).toBeDefined();
    expect(element(by.css('#date'))).toBeDefined();
    expect(element(by.css('#departure-time'))).toBeDefined();
  });
});