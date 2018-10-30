const webdriver = require('selenium-webdriver');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;

const ModelsTemplateTests = function (OPTIONS, driver) {

    this.canSeeFilterTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async() => (await getElementByCss('.filter-list li:nth-child(2)')).click())
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    };
    this.canSeeModelsTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async() => (await getElementByCss('.list-models .l-m-item:nth-child(2)')))
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    };
    this.canEnterDetailsTest = function () {
        let initialTitle;
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async() => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) h4 a')).getAttribute('title'))
            .then(tempTitle => initialTitle = tempTitle)
            .then(async() => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async() => (await getElementByCss('h1')).getText())
            .then(modelTitle => assert.equal(modelTitle, initialTitle, 'Can not find title on page'))
    };
    this.canSwipeTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async() => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async() => (await getElementByCss('.arrow')).click())
            .catch(()=> assert.ok(false, 'Can not find slider on page'))
    };
    this.canSeeColorsTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async() => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async() => (await getElementByCss('#ppb #colors div figure picture img')).click())
            .then(async() => (await getElementByCss('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find available colors on page'))
    };
    this.canSeeThesisTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async() => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async() => (await getElementByCss('#ppb #thesis div ul li')).click())
            .catch(()=> assert.ok(false, 'Can not find thesis on page'))
    };
    this.canAskCostTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async() => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#action2 button'))))
            .catch(()=> assert.ok(false, 'Can not find button to ask project cost on page'))
    };

    function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path)))
            .then(()=> driver.sleep(1500))
            .then(()=> driver.findElement(By.css(path)));
    }
};
module.exports = ModelsTemplateTests;