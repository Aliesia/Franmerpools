const webdriver = require('selenium-webdriver');
const {describe,it,afterEach,beforeEach} = require('mocha');
const assert = require('assert')
const By = webdriver.By;
const until = webdriver.until;
const chrome = require('selenium-webdriver/chrome');
const OPTIONS = {
    site: 'https://www.franmerpools.ru/',
    screen:{
        width: 1280,
        height: 720
    }
}

describe('Main navigation check',function(){
    let driver;
    this.timeout(50000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
    });
    afterEach(function () {
        driver.quit();
    });

    it('Can see top menu',async function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('.main-nav li'))))
    });

    it('Can enter model series', function () {
        let sectionTitle = 'Модельный ряд';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.l-m-item'))))
            .then(() => driver.findElement(By.css('.section-title h1')).getText())
            .then(title=>{
                assert.equal(title, sectionTitle, 'section title is not defined')
            })
    });
    it('Can enter gallery', function () {
        let sectionTitle = 'Галерея';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(3) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.img'))))
            .then(() => driver.findElement(By.css('.section-title h1')).getText())
            .then(title=>{
                assert.equal(title, sectionTitle, 'section title is not defined')
            })
    });
    it('Can enter aboutUs', function () {
        let sectionTitle = 'О нас';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list'))))
            .then(() => driver.findElement(By.css('main .section-title h1')).getText())
            .then(title=>{
                assert.equal(title, sectionTitle, 'section title is not defined')
            })
    });
    it('Can enter questions', function () {
        let sectionTitle = 'Вопросы и ответы';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(5) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.column'))))
            .then(() => driver.findElement(By.css('.section-title h1')).getText())
            .then(title=>{
                assert.equal(title, sectionTitle, 'title is not defined')
            })
    });
    it('Can enter contacts', function () {
        let sectionTitle = 'Наши салоны продаж';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.filter-list'))))
            .then(() => driver.findElement(By.css('.section-title h1')).getText())
            .then(title=>{
                assert.equal(title, sectionTitle, 'title is not defined')
            })
    });
    it('Can return on MainPage', function () {
        let sectionTitle = 'до его установки и после...';
        return driver.get(OPTIONS.site+ 'kontakty')
            .then(async() => (await getElementByCss('.main-nav li:nth-child(1) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.screen span'))))
            .then(() => driver.findElement(By.css('.screen span')).getText())
            .then(title=>{
               assert.equal(title, sectionTitle, 'title is not defined')
            })
    });


    function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path)))
            .then(()=> driver.findElement(By.css(path)));
    }
});


