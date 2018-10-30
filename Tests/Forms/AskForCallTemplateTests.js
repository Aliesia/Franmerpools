const webdriver = require('selenium-webdriver');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;

const AskForCallTemplateTests = function (OPTIONS, driver) {

    this.canSeeFormTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () =>await getElementByCss('#secCall .left fieldset label:nth-child(1) input').getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in first input')
                }
            })
            .then(async () =>await getElementByCss('#secCall .left fieldset label:nth-child(2) input').getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in second input')
                }
            })
    };
    this.canNotLeaveEmptyFormTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () =>await getElementByCss('#secCall .left fieldset label:nth-child(1) input'))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys(''))
            .then(async () =>await getElementByCss('#secCall .left fieldset button').click())
            .then(()=> driver.findElements(By.css('fieldset .error')))
            .then(elements => {
                if(elements.length !== 2){
                    assert.ok(false,'Two .error are not found')
                }
            })
    };
    this.emptyUserPhoneTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () =>await getElementByCss('#secCall .left fieldset label:nth-child(1) input'))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys('fake_name'))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys(''))
            .then(async () =>await getElementByCss('#secCall .left fieldset button').click())
            .then(async () =>await getElementByCss('fieldset .error input').getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_phone', 'There is no .error in userPhone label'))
    };
    this.emptyUserNameTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () =>await getElementByCss('#secCall .left fieldset label:nth-child(1) input'))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys(''))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys('1110011100'))
            .then(async () =>await getElementByCss('#secCall .left fieldset button').click())
            .then(async () =>await getElementByCss('fieldset .error input').getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_name', 'There is no .error in userName label'))
    };
    this.canSuccessfullyAskForCallTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () =>await getElementByCss('#secCall .left input'))
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys('fake name'))
            .then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys('1110011100'))
            .then(async () =>await getElementByCss('#secCall .left fieldset button').click())
            .then(()=> driver.sleep(2000))
            .then(async () =>await getElementByCss('#thanks h2').getText())
            .then(thanks => assert.equal(thanks,'Спасибо!', 'User did not ask for a call'))
    };


    function getElementByCss(path) {
        driver.wait(until.elementLocated(By.css(path)));
        driver.sleep(2000);
        return driver.findElement(By.css(path));

    }
};
module.exports = AskForCallTemplateTests;