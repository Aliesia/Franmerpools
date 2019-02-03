const webdriver = require('selenium-webdriver');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;

const NavigationTests = function (OPTIONS, driver) {


    this.canSeeTopMenuTest = function () {
       driver.get(OPTIONS.site);
       return driver.wait(until.elementLocated(By.css('.main-nav li')))
            .catch(()=> assert.ok(false, 'Can not find: .main-nav li'))
    };
    this.canEnterModelsTest = function () {
            let sectionTitle = 'Модельный ряд';
            return driver.get(OPTIONS.site)
                .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
                .then(async() => (await getElementByCss('.section-title h1')).getText())
                .then(title=>assert.equal(title, sectionTitle, 'section title is not defined'));
    };
    this.canEnterGalleryTest = function() {
        let sectionTitle = 'Галерея';
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(3) a')).click())
            .then(async () => (await getElementByCss('.section-title h1')).getText())
            .then(title => assert.equal(title, sectionTitle, 'section title is not defined'));
    };
    this.canEnterAboutUsTest = function() {
        let sectionTitle = 'О нас';
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(async () => (await getElementByCss('.section-title h1')).getText())
            .then(title => assert.equal(title, sectionTitle, 'section title is not defined'));
    };
    this.canEnterQuestionsTest =  function() {
        let sectionTitle = 'Вопросы и ответы';
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(5) a')).click())
            .then(async () => (await getElementByCss('.section-title h1')).getText())
            .then(title => assert.equal(title, sectionTitle, 'title is not defined'));
    };
    this.canEnterContactsTest =  function() {
        let sectionTitle = 'Наши салоны продаж';
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(async () => (await getElementByCss('.section-title h1')).getText())
            .then(title => assert.equal(title, sectionTitle, 'title is not defined'));
    };
    this.canReturnStartPageTest = function() {
        let sectionTitle = 'до его установки и после...';
        return driver.get(OPTIONS.site + 'kontakty')
            .then(async () => (await getElementByCss('.main-nav li:nth-child(1) a')).click())
            .then(async () => (await getElementByCss('.screen span')).getText())
            .then(title => assert.equal(title, sectionTitle, 'title is not defined'));
    };


    function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path), 8000))
            .then(() => driver.sleep(1000))
            .then(()=> {
                return driver.findElement(By.css(path))
            });
    }
};
module.exports = NavigationTests;