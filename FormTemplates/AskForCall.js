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


describe('Ask for a call form',function() {
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

    it('Can see form template on main page', function(){
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('#secCall .left fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.css('#secCall .left fieldset label:nth-child(1) input')).getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in first input')
                }
            })
            .then(() => driver.findElement(By.css('#secCall .left fieldset label:nth-child(2) input')).getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in second input')
                }
            })

    });
    it('Can not leave empty fields in form', function () {
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('#secCall .left fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys(''))
            .then(() => driver.findElement(By.css('#secCall .left fieldset button')).click())
            .then(()=> driver.findElements(By.css('fieldset .error')))
            .then(elements => {
                if(elements.length !== 2){
                    assert.ok(false,'Two .error are not found')
                }
            })
    });
    it('User phone is required', function () {
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('#secCall .left fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys('fake_name'))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys(''))
            .then(() => driver.findElement(By.css('#secCall .left fieldset button')).click())
            .then(() => driver.findElement(By.css('fieldset .error input')).getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_phone', 'There is no .error in userPhone label'))
    });
    it('User name is required', function () {
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('#secCall .left fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys('1110011100'))
            .then(() => driver.findElement(By.css('#secCall .left fieldset button')).click())
            .then(() => driver.findElement(By.css('fieldset .error input')).getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_name', 'There is no .error in userName label'))
    });
    it('User successfully ask for a call', function() {
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('#secCall .left fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys('fake name'))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys('1110011100'))
            .then(() => driver.findElement(By.css('#secCall .left fieldset button')).click())
            .then(()=> driver.wait(until.elementLocated(By.css('#thanks h2'))))
            .then(()=> driver.sleep(1000))
            .then(()=> driver.findElement(By.css('#thanks h2')).getText())
            .then(thanks => assert.equal(thanks,'Спасибо!', 'User did not ask for a call'))
    });
});
