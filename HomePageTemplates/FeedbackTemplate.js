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

    it('Can see video on template 3', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#trailerPlayer'))),2000)
            .catch(()=> assert.ok(false, 'Can not find element: #trailerPlayer'))
            .then(()=> driver.findElement(By.css('.feedfeed')))
            .catch(()=> assert.ok(false, 'Can not find element: .feedfeed'))
    });
    it('Smaller button on template 3 is working properly', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secFeedback h2'))))
            .then(()=> driver.findElement(By.css('#secFeedback header a')).getAttribute('href'))
            .catch(()=> assert.ok(false, 'link is not found'))
    });


});