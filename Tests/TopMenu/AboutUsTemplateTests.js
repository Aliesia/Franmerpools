const webdriver = require('selenium-webdriver');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;

const AboutUsTemplateTests = function (OPTIONS, driver) {

    this.canSeeFilterTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(async() => (await getElementByCss('.filter-list li:nth-child(2)')).click())
            .catch(()=> assert.ok(false, 'Can not find element on page'))
    };
    this.canSeeTextTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(async() => (await getElementByCss('.section-content .holder p')))
            .catch(()=> assert.ok(false, 'Can not find text on page'))
    };
    this.canSeePictureTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(async() => (await getElementByCss('.thumbnails-slider .thumb-holder #article-gallery li picture img')).click())
            .then(async() => (await getElementByCss('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find pictures on page'))
    };
    this.canSeeTextTemplateTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(async() => (await getElementByCss('.filter-list li:nth-child(2)')).click())
            .then(async() => (await getElementByCss('.section-content .holder ul li')))
            .catch(()=> assert.ok(false, 'Can not find text on page'))
    };
    this.canSeePictureInTextTemplateTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(async() => (await getElementByCss('.filter-list li:nth-child(3)')).click())
            .then(async() => (await getElementByCss('.section-content .holder p')))
            .then(async() => (await getElementByCss('.thumb-holder ul li picture img')).click())
            .then(async() => (await getElementByCss('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find text with picture on page'))
    };
    this.canSeeMapTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(4) a')).click())
            .then(async() => (await getElementByCss('.filter-list li:nth-child(4)')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#map .gm-style button'))))
            .catch(()=> assert.ok(false, 'Can not find map on page'))
    };

    function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path), 8000))
            .then(() => driver.sleep(2000))
            .then(()=> {
                return driver.findElement(By.css(path))
            });
    }
};
module.exports = AboutUsTemplateTests;