const webdriver = require('selenium-webdriver');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;

const QuestionTemplateTests = function (OPTIONS, driver) {

    this.canSeeAnswersTest = function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(5) a')).click())
            .then(async() => (await getElementByCss('.section-content .column ul li:nth-of-type(4)')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('.section-content .column ul .active .hidden-txt p'))))
            .catch(()=> assert.ok(false, 'Can not find answer on selected question'))
    };

    function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path)))
            .then(()=> driver.sleep(1500))
            .then(()=> driver.findElement(By.css(path)));
    }
};
module.exports = QuestionTemplateTests;