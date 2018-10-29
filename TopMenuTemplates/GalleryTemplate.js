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

    it('Can see picture in Gallery', function(){
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(3) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.slider-line .list-img-gal img'))))
            .then(()=> driver.findElement(By.css('.slider-line .list-img-gal img')).click())
            .then(()=> driver.sleep(1000))
            .then(()=> driver.wait(until.elementLocated(By.css('.psh-closer'))))
            .then(()=> driver.findElement(By.css('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find picture to open on full screen in Gallery'))
    });
    it('Can see all pictures in Gallery', function(){
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(3) a')).click())
            .then(()=> driver.sleep(1000))
            .then(()=> driver.wait(until.elementLocated(By.css('.one-line-gal .slider-line .btn-open'))))
            .then(()=> driver.findElement(By.css('.one-line-gal .slider-line .btn-open')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.header-line span'))))
            .catch(()=> assert.ok(false, 'Can not open full list of pictures in Gallery'))
    });

});