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


describe('Main navigation templates',function(){
    let driver;
    this.timeout(30000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
    });
    afterEach(function () {
        driver.close();
    });
    function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path)))
            .then(()=> driver.sleep(1500))
            .then(()=> driver.findElement(By.css(path)));
    }

    it('Can see answers on questions', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(5) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.section-content .column ul li:nth-of-type(4)'))))
            .then(()=> driver.findElement(By.css('.section-content .column ul li:nth-of-type(4)')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.section-content .column ul .active .hidden-txt p'))))
            .catch(()=> assert.ok(false, 'Can not find answer on selected question'))
    });

});