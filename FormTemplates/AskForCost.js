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


describe('Can ask for a cost of selected pool',function() {
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

    it('Can enter page with pool cost', function () {
        let costTitle = 'ЗАПРОС НА РАСЧЕТ СТОИМОСТИ';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) a'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('#ppb  .req-proj-cost'))))
            .then(() => driver.findElement(By.css('#ppb .req-proj-cost ')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.id('req-closer'))))
            .then(() => driver.findElement(By.css('#req h2')).getText())
            .then(titleData=> assert.equal(titleData, costTitle, 'Can not enter page with cost calculate'))

    });
    it('Can see selected pool on page with cost calculate', function () {
        let poolModel;
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) a'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).getAttribute('title'))
            .then(requiredPoolModel => poolModel = requiredPoolModel)
            .then(() => driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('#ppb  .req-proj-cost'))))
            .then(() => driver.findElement(By.css('#ppb .req-proj-cost ')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('.pool strong'))))
            .then(() => driver.findElement(By.css('.pool strong')).getText())
            .then(selectedPool=> assert.equal(selectedPool, poolModel, 'It is not selected pool'))
    });
    it('Can see form on page with cost calculate', function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) a'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('#ppb  .req-proj-cost'))))
            .then(() => driver.findElement(By.css('#ppb .req-proj-cost ')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('.fields form'))))
            .catch(()=> assert.ok(false, 'form is not found'))
    });
    it('Can not leave empty fields in form', function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) a'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('#ppb .req-proj-cost'))))
            .then(() => driver.findElement(By.css('#ppb .req-proj-cost ')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('.fields form fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_email')).clear())
            .then(() => driver.findElement(By.name('user_email')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys(''))
            .then(() => driver.wait(until.elementLocated(By.css('#sub-btn'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(() => driver.findElement(By.css('#sub-btn button')).click())
            .then(()=> driver.findElements(By.css('fieldset .error')))
            .then(elements => {
                if(elements.length !== 3){
                    assert.ok(false,'Three .error are not found')
                }
            })
    });
    it('Can find required attribute in form',function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) a'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('#ppb .req-proj-cost'))))
            .then(() => driver.findElement(By.css('#ppb .req-proj-cost ')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.fields form fieldset label:nth-child(1) input')).getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in first input')
                }
            })
            .then(() => driver.findElement(By.css('.fields form fieldset label:nth-child(2) input')).getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in second input')
                }
            })
            .then(() => driver.findElement(By.css('.fields form fieldset label:nth-child(3) input')).getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in third input')
                }
            })
    });
    it('User name is required',function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) a'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('#ppb .req-proj-cost'))))
            .then(() => driver.findElement(By.css('#ppb .req-proj-cost ')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('.fields form fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_email')).clear())
            .then(() => driver.findElement(By.name('user_email')).sendKeys('fake'+ Math.random().toString(36).substring(6)+ '@test.com'))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys('1110011100'))
            .then(() => driver.wait(until.elementLocated(By.css('#sub-btn'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(() => driver.findElement(By.css('#sub-btn button')).click())
            .then(() => driver.wait(until.elementLocated(By.css('fieldset .error input'))))
            .then(() => driver.findElement(By.css('fieldset .error input')).getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_name', 'There is no .error in userName label'))
    });
    it('User email is required',function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) a'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('#ppb .req-proj-cost'))))
            .then(() => driver.findElement(By.css('#ppb .req-proj-cost ')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('.fields form fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys('fake_name'))
            .then(() => driver.findElement(By.name('user_email')).clear())
            .then(() => driver.findElement(By.name('user_email')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys('1110011100'))
            .then(() => driver.wait(until.elementLocated(By.css('#sub-btn'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(() => driver.findElement(By.css('#sub-btn button')).click())
            .then(() => driver.wait(until.elementLocated(By.css('fieldset .error input'))))
            .then(() => driver.findElement(By.css('fieldset .error input')).getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_email', 'There is no .error in userEmail label'))
    });
    it('User phone is required',function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) a'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('#ppb .req-proj-cost'))))
            .then(() => driver.findElement(By.css('#ppb .req-proj-cost ')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('.fields form fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys('fake_name'))
            .then(() => driver.findElement(By.name('user_email')).clear())
            .then(() => driver.findElement(By.name('user_email')).sendKeys('fake'+ Math.random().toString(36).substring(6)+ '@test.com'))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys(''))
            .then(() => driver.wait(until.elementLocated(By.css('#sub-btn'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(() => driver.findElement(By.css('#sub-btn button')).click())
            .then(() => driver.wait(until.elementLocated(By.css('fieldset .error input'))))
            .then(() => driver.findElement(By.css('fieldset .error input')).getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_phone', 'There is no .error in userPhone label'))
    });
    it('Can order payment cost of selected pool',function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) a'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('#ppb .req-proj-cost'))))
            .then(() => driver.findElement(By.css('#ppb .req-proj-cost ')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('.fields form fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys('fake_name'))
            .then(() => driver.findElement(By.name('user_email')).clear())
            .then(() => driver.findElement(By.name('user_email')).sendKeys('fake'+ Math.random().toString(36).substring(6)+ '@test.com'))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys('1110011100'))
            .then(() => driver.findElement(By.name('user_message')).clear())
            .then(() => driver.findElement(By.name('user_message')).sendKeys('My message is here!'))
            .then(() => driver.findElement(By.css('.cstm-checkbox')).click())
            .then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(() => driver.wait(until.elementLocated(By.css('#sub-btn'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('#sub-btn button')).click())
            .catch(() => assert.ok(false,'can not find button'))
    });
//TODO:: ask about button. Can not test if form was sent.
    it('Can find map on page with cost calculate', function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.list-models .l-m-item:nth-of-type(2) a'))))
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.wait(until.elementLocated(By.css('#ppb .req-proj-cost'))))
            .then(() => driver.findElement(By.css('#ppb .req-proj-cost ')).click())
            .then(() => driver.sleep(2000))
            .then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(() => driver.wait(until.elementLocated(By.css('section #map img'))))
            .then(() => driver.findElement(By.css('section #map ul li')).click())
            .catch(() => assert.ok(false,'can not find a map'))
    });
    //TODO:: can not get to selected sell-point.

    function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path)))
            .then(()=> driver.findElement(By.css(path)));
    }
});