describe('create rides', function() {
  it('should show details from a valid rides', function() {
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

    //<a ng-href="#/menu/rides/{{ride.id}}/show/">
      //<button class="button button-positive button-small">Visualizar Carona</button>
        //</a>

    var selectVehicleButton = element(by.css('.button.button.button-positive.button-small'));
    expect(selectVehicleButton).toBeDefined();
    selectVehicleButton.click();

    browser.driver.sleep(5000);


    expect(element(by.css('#origin'))).toBeDefined();
    expect(element(by.css('#destination'))).toBeDefined();
    expect(element(by.css('#total-seats'))).toBeDefined();
    expect(element(by.css('#date'))).toBeDefined();
    expect(element(by.css('#departure-time'))).toBeDefined();
    expect(element(by.css('#return-time'))).toBeDefined();
    expect(element(by.css('#description'))).toBeDefined();




  });
});