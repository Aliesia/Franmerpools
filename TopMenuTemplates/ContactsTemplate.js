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

    it('Can see filter of places in contacts', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(3) a'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(3) a')).click())
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    });
    it('Can see selected showroom in contacts', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(3) a'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(3) a')).click())
            .then(()=> driver.sleep(1000))
            .then(()=> driver.wait(until.elementLocated(By.css('.close-showroom'))))
            .then(()=> driver.findElement(By.css('.close-showroom')).click())
            .catch(()=> assert.ok(false, 'Can not close showroom'))
    });
    it('Can see slider of selected showroom in contacts', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(3) a'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(3) a')).click())
            .then(()=> driver.sleep(1000))
            .then(()=> driver.wait(until.elementLocated(By.css('.mark-slider .cont-thumbnails-btn svg '))))
            .catch(()=> assert.ok(false, 'Can not find slider on page'))
    });
    it('Can see map of showrooms in contacts', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.main-holder .map-image #office2 a'))))
            .then(()=> driver.findElement(By.css('.main-holder .map-image #office2 a')).click())
            .then(()=> driver.sleep(1000))
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    });

});