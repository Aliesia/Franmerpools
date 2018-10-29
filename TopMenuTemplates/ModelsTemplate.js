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
    it('Can see filter of models', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list li:nth-child(2)'))))
            .then(()=> driver.findElement(By.css('.filter-list li:nth-child(2)')).click())
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    });
    it('Can see models on model series', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-child(2)'))))
            .then(()=> driver.findElement(By.css('.list-models')))
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    });

    it('Can enter details', function () {
        let initialTitle;
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) h4'))))
            .then(()=> driver.sleep(2000))
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) h4 a')).getAttribute('title'))
            .then(tempTitle => {
                initialTitle = tempTitle;
            })
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#ppb h1'))))
            .then(()=> driver.sleep(2000))
            .then(()=> driver.findElement(By.css('h1')).getText())
            .then(modelTitle=> assert.equal(modelTitle, initialTitle, 'Can not find title on page'))
    });

    it('Can swipe pictures', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) h4'))))
            .then(()=> driver.sleep(1000))
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('picture'))))
            .then(()=> driver.sleep(1000))
            .then(()=> driver.findElement(By.css('.arrow')).click())
            .catch(()=> assert.ok(false, 'Can not find slider on page'))
    });
    it('Can see available colors of selected model', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) h4'))))
            .then(()=> driver.sleep(1000))
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#ppb #colors div figure picture img'))))
            .then(()=> driver.findElement(By.css('#ppb #colors div figure picture img')).click())
            .then(()=> driver.sleep(2000))
            .then(()=> driver.findElement(By.css('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find available colors on page'))
    });
    it('Can see thesis', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) h4'))))
            .then(()=> driver.sleep(1500))
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#ppb #thesis div ul li h6'))))
            .then(()=> driver.findElement(By.css('#ppb #thesis div ul li')).click())
            .catch(()=> assert.ok(false, 'Can not find thesis on page'))
    });
    it('Can ask project cost', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) h4'))))
            .then(()=> driver.sleep(1000))
            .then(()=> driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#action2 button'))))
            .catch(()=> assert.ok(false, 'Can not find button to ask project cost on page'))
    });

});