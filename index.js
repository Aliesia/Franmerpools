const webdriver = require('selenium-webdriver');
const {describe,it,afterEach,beforeEach} = require('mocha');
const assert = require('assert')
const By = webdriver.By;
const until = webdriver.until;
const chrome = require('selenium-webdriver/chrome');
const OPTIONS = {
    site: 'http://www.franmerpools.ru/',
    screen:{
        width: 1280,
        height: 720
    }
};

describe('Main navigation check',function(){
    let driver;
    this.timeout(30000);
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
            .then(()=> driver.wait(until.elementLocated(By.css('.main-nav li'))), 2000)
            .catch(()=> assert.ok(false, 'Can not find: .main-nav li'))
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

describe('Main page functionality',function() {
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

    it('Header button on first template is working properly', function () {
        let firstFooterStepName = 'ТЕХНОЛОГИИ';
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('header .button'))))
            .then(() => driver.findElement(By.css('header .button')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.steps'))))
            .then(() => driver.findElement(By.css('.steps li:nth-child(1) a')).getText())
            .then(stepName => assert.equal(stepName, firstFooterStepName, 'Button is not providing to the right page'));
    });
    //TODO:: telephone number in top right corner is differ from clicked number.

    it('Footer svg-button on first template move to next template', function () {
        let secondSlideTitle = 'Карта выполненных проектов';
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('footer svg'))))
            .then(() => driver.findElement(By.css('footer svg')).click())
            .then(() => driver.wait(until.elementLocated(By.css('h2'))))
            .then(() => driver.findElement(By.css('h2')).getText())
            .then(title => assert.equal(title, secondSlideTitle, 'Button on first template is not providing to the next template'))
    });
    // TODO:: How the svg-button is working?

    it('Can see map on second template', function(){
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('h2'))))
            .then(()=> driver.wait(until.elementLocated(By.css('#map'))))
            .catch(()=> assert.ok(false, 'Can not find:#map'))
    });
    it('Can see video on template 3', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#trailerPlayer'))),2000)
            .catch(()=> assert.ok(false, 'Can not find element: #trailerPlayer'))
            .then(()=> driver.findElement(By.css('.feedfeed')), 2000)
            .catch(()=> assert.ok(false, 'Can not find element: .feedfeed'))
    });
    it('Smaller button on template 3 is working properly', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secFeedback h2'))))
            .then(()=> driver.findElement(By.css('#secFeedback header a')).getAttribute('href'))
            .catch(()=> assert.ok(false, 'link is not found'))
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

    it('Can see image on template 5', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secTeam h2'))))
            .then(()=> driver.findElement(By.css('#secTeam #teamWrap #teamPhoto')).getAttribute('src'))
            .catch(()=> assert.ok(false, 'image is not found'))
    });
    it('Can select a worker on template 5', function(){
        let initialHuman = 0;
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secTeam #teamWrap ul li'))))
            .then(()=> driver.findElement(By.css('#secTeam #teamWrap ul li')).getAttribute('data-n'))
            .then(tempData => initialHuman = tempData)
            .then(()=> driver.findElement(By.css('#secTeam #teamWrap ul li:nth-child(2)')).getAttribute('data-n'))
            .then(newHuman => assert.notEqual(newHuman,initialHuman, 'Human can not be found'))
            //.catch(()=> assert.ok(false, 'Image is not found'))
    });

    it('Can see form on template 6', function () {
        return driver.get(OPTIONS.site)
            .then(()=> driver.wait(until.elementLocated(By.css('#secCall h3'))))
            .then(()=> driver.findElement(By.css('#secCall .left fieldset label')).getAttribute('input'))
            .catch(()=> assert.ok(false, 'form is not found'))
    });

});
