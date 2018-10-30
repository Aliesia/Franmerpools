const webdriver = require('selenium-webdriver');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;

const GalleryTemplateTests = function (OPTIONS, driver) {

    this.canSeePicturesTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(3) a')).click())
            .then(async() => (await getElementByCss('.slider-line .list-img-gal img')).click())
            .then(async() => (await getElementByCss('.psh-closer')).click())
            .catch(()=> assert.ok(false, 'Can not find picture to open on full screen in Gallery'))
    };
    this.canSeeAllPicturesTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(3) a')).click())
            .then(async() => (await getElementByCss('.one-line-gal .slider-line .btn-open')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.header-line span'))))
            .catch(()=> assert.ok(false, 'Can not open full list of pictures in Gallery'))
    };

    function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path)))
            .then(()=> driver.sleep(1500))
            .then(()=> driver.findElement(By.css(path)));
    }
};
module.exports = GalleryTemplateTests;