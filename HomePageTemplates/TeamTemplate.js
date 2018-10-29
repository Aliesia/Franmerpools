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
    });


});