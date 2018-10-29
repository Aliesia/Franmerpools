const webdriver = require('selenium-webdriver');
const {describe,it,afterEach,beforeEach} = require('mocha');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;
const chrome = require('selenium-webdriver/chrome');
const OPTIONS = {
    site: '',
    screen:{
        width: 1280,
        height: 720
    }
};


describe('Home page functionality',function() {
    let driver;
    this.timeout(50000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
    });
    afterEach(function () {
        driver.close();
    });

    it('Button on template 4 is working properly', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secShowrooms h1'))))
            .then(()=> driver.findElement(By.css('#secShowrooms header a')).getAttribute('href'))
            .catch(()=> assert.ok(false, 'link is not found'))
    });
    it('Can swipe to another picture from template 4', function(){
        let initialSlide = 0;
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secShowrooms'))))
            .then(()=> driver.findElement(By.css('#secShowrooms .glider ul')).getAttribute('style'))
            .then(tempData => initialSlide = tempData)
            .then(()=> driver.findElement(By.css('#secShowrooms .glider .right')).click())
            .then(()=> driver.sleep(1000))
            .then(()=> driver.findElement(By.css('#secShowrooms .glider ul')).getAttribute('style'))
            .then(newSlider => assert.notEqual(newSlider,initialSlide, 'Slide is not working properly'))
    });

});