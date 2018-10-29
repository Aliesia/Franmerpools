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

    it('Can see filter of information about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(2)'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(2)')).click())
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    });
    it('Can see text in about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.section-content .holder p'))))
            .then(()=> driver.findElement(By.css('.section-content .holder p')))
            .catch(()=> assert.ok(false, 'Can not find text on page'))
    });
    it('Can see picture in about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.thumbnails-slider .thumb-holder #article-gallery li picture img'))))
            .then(()=> driver.findElement(By.css('.thumbnails-slider .thumb-holder #article-gallery li picture img')).click())
            .then(()=> driver.sleep(2000))
            .then(()=> driver.wait(until.elementLocated(By.css('.psh-closer'))))
            .then(()=> driver.findElement(By.css('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find pictures on page'))
    });
    it('Can see text template in about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(2)'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(2)')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.section-content .holder ul li'))))
            .then(()=> driver.findElement(By.css('.section-content .holder ul li')))
            .catch(()=> assert.ok(false, 'Can not find text on page'))
    });
    it('Can see text template with picture in about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(3)'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(3)')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.section-content .holder p'))))
            .then(()=> driver.findElement(By.css('.section-content .holder p')))
            .then(()=> driver.sleep(1000))
            .then(()=> driver.wait(until.elementLocated(By.css('.thumb-holder ul li picture img'))))
            .then(()=> driver.findElement(By.css('.thumb-holder ul li picture img')).click())
            .then(()=> driver.sleep(2000))
            .then(()=> driver.findElement(By.css('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find text with picture on page'))
    });
    it('Can see map in about us', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(4)'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(4)')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#map .gm-style button'))))
            .catch(()=> assert.ok(false, 'Can not find map on page'))
    });


});