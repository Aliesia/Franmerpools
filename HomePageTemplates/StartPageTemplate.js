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

describe('Home page functionality',function() {
    let driver;
    this.timeout(50000);
    beforeEach(function () {
        let chromeCapabilities = webdriver.Capabilities.chrome();
        let chromeOptions = new chrome.Options().windowSize(OPTIONS.screen);
        driver = new webdriver.Builder().setChromeOptions(chromeOptions).withCapabilities(chromeCapabilities).build();
    });
    afterEach(function () {
        driver.close();
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

    it('Footer svg-button on first template move to next template', function () {
        let secondSlideTitle = 'Карта выполненных проектов';
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('footer svg'))))
            .then(() => driver.findElement(By.css('footer svg')).click())
            .then(() => driver.wait(until.elementLocated(By.css('h2'))))
            .then(() => driver.findElement(By.css('h2')).getText())
            .then(title => assert.equal(title, secondSlideTitle, 'Button on first template is not providing to the next template'))
    });
});