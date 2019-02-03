const webdriver = require('selenium-webdriver');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;

const ContactsTemplateTests = function (OPTIONS, driver) {

    this.canSeeFilterTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(async() => (await getElementByCss('.filter-list li:nth-child(3) a')).click())
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    };
    this.canSeeShowroomTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(async() => (await getElementByCss('.filter-list li:nth-child(3) a')).click())
            .then(async() => (await getElementByCss('.close-showroom')).click())
            .catch(()=> assert.ok(false, 'Can not close showroom'))
    };
    this.canSeeSliderTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(async() => (await getElementByCss('.filter-list li:nth-child(3) a')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.mark-slider .cont-thumbnails-btn svg '))))
            .catch(()=> assert.ok(false, 'Can not find slider on page'))
    };
    this.canSeeMapTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(6) a')).click())
            .then(async() => (await getElementByCss('.main-holder .map-image #office2 a')).click())
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    };

    function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path), 8000))
            .then(() => driver.sleep(1000))
            .then(()=> {
                return driver.findElement(By.css(path))
            });
    }
};
module.exports = ContactsTemplateTests;