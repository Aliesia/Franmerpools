const webdriver = require('selenium-webdriver');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;

const AskForCostTemplateTests = function (OPTIONS, driver) {

    this.canEnterPageTest = function () {
        let costTitle = 'ЗАПРОС НА РАСЧЕТ СТОИМОСТИ';
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async() => (await getElementByCss('main .list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async() => (await getElementByCss('#ppb .req-proj-cost')).click())
            //.then(async() => (await getElementByCss('#action2 .btn')).click())
            .then(async() => (await getElementByCss('#req h2')).getText())
            .then(titleData=> assert.equal(titleData, costTitle, 'Can not enter page with cost calculate'))
    };
    this.canSeeSelectedPoolTest =  function () {
        let poolModel;
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async() => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).getAttribute('title'))
            .then(requiredPoolModel => poolModel = requiredPoolModel)
            .then(async() => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async() => (await getElementByCss('#ppb .req-proj-cost')).click())
            //.then(async() => (await getElementByCss('#action2 button')).click())
            .then(async() => (await getElementByCss('.pool strong')).getText())
            .then(selectedPool=> assert.equal(selectedPool, poolModel, 'It is not selected pool'))
    };
    this.canSeeFormTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async() => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async() => (await getElementByCss('#ppb .req-proj-cost')).click())
            //.then(async() => (await getElementByCss('#action2 button')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.fields form'))))
            .catch(()=> assert.ok(false, 'form is not found'))
    };
    this.canNotLeaveEmptyFormTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async () => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async () => (await getElementByCss('#ppb .req-proj-cost')).click())
            //.then(async() => (await getElementByCss('#action2 button')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.fields form fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_email')).clear())
            .then(() => driver.findElement(By.name('user_email')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys(''))
            .then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(async () => (await getElementByCss('#sub-btn button')).click())
            .then(()=> driver.findElements(By.css('fieldset .error')))
            .then(elements => {
                if(elements.length !== 3){
                    assert.ok(false,'Three .error are not found')
                }
            })
    };
    this.canSeeRequiredFieldsTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async() => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async() => (await getElementByCss('#ppb .req-proj-cost')).click())
            //.then(async() => (await getElementByCss('#action2 button')).click())
            .then(async() => (await getElementByCss('.fields form fieldset label:nth-child(1) input')).getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in first input')
                }
            })
            .then(async() => (await getElementByCss('.fields form fieldset label:nth-child(2) input')).getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in second input')
                }
            })
            .then(async() => (await getElementByCss('.fields form fieldset label:nth-child(3) input')).getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in third input')
                }
            })
    };
    this.emptyUserNameTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async () => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async () => (await getElementByCss('#ppb .req-proj-cost')).click())
            //.then(async() => (await getElementByCss('#action2 button')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.fields form fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_email')).clear())
            .then(() => driver.findElement(By.name('user_email')).sendKeys('fake'+ Math.random().toString(36).substring(6)+ '@test.com'))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys('1110011100'))
            //.then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(async () => (await getElementByCss('#sub-btn button')).click())
            .then(async () => (await getElementByCss('fieldset .error input')).getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_name', 'There is no .error in userName label'))
    };
    this.emptyUserEmailTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async () => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async () => (await getElementByCss('#ppb .req-proj-cost')).click())
            //.then(async() => (await getElementByCss('#action2 button')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.fields form fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys('fake_name'))
            .then(() => driver.findElement(By.name('user_email')).clear())
            .then(() => driver.findElement(By.name('user_email')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys('1110011100'))
            .then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(async () => (await getElementByCss('#sub-btn button')).click())
            .then(async () => (await getElementByCss('fieldset .error input')).getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_email', 'There is no .error in userEmail label'))
    };
    this.emptyUserPhoneTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async () => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async () => (await getElementByCss('#ppb .req-proj-cost')).click())
            //.then(async() => (await getElementByCss('#action2 button')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.fields form fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys('fake_name'))
            .then(() => driver.findElement(By.name('user_email')).clear())
            .then(() => driver.findElement(By.name('user_email')).sendKeys('fake'+ Math.random().toString(36).substring(6)+ '@test.com'))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys(''))
            .then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(async () => (await getElementByCss('#sub-btn button')).click())
            .then(async () => (await getElementByCss('fieldset .error input')).getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_phone', 'There is no .error in userPhone label'))
    };
    this.canRequestCostTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async () => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async () => (await getElementByCss('#ppb .req-proj-cost')).click())
            //.then(async() => (await getElementByCss('#action2 button')).click())
            .then(() => driver.wait(until.elementLocated(By.css('.fields form fieldset label:nth-child(1) input'))))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys('fake_name'))
            .then(() => driver.findElement(By.name('user_email')).clear())
            .then(() => driver.findElement(By.name('user_email')).sendKeys('fake'+ Math.random().toString(36).substring(6)+ '@test.com'))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys('1110011100'))
            .then(() => driver.findElement(By.name('user_message')).clear())
            .then(() => driver.findElement(By.name('user_message')).sendKeys('My message is here!'))
            .then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(() => driver.findElement(By.css('.cstm-checkbox')).click())
            .then(async () => (await getElementByCss('#sub-btn button')).click())
            .catch(() => assert.ok(false,'can not find button'))
    };
    this.canSeeMapTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('.main-nav li:nth-child(2) a')).click())
            .then(async () => (await getElementByCss('.list-models .l-m-item:nth-of-type(2) a')).click())
            .then(async () => (await getElementByCss('#ppb .req-proj-cost')).click())
            //.then(async() => (await getElementByCss('#action2 button')).click())
            .then(() => driver.findElement(By.css('.phpdebugbar-close-btn')).click())
            .then(async () => (await getElementByCss('section #map ul li')).click())
            .catch(() => assert.ok(false,'can not find a map'))
    };


    function getElementByCss(path) {
        return driver.sleep(2000)
            .then(()=> driver.wait(until.elementLocated(By.css(path),8000)))
            .then(()=> {
                return driver.findElement(By.css(path))
            });
    }
};
module.exports = AskForCostTemplateTests;