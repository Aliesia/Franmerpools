const webdriver = require('selenium-webdriver');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;
const {describe} = require('mocha')
const fakeUserData = {
	name:'fake_name',
	phone:'123321444'
}

const AskForCallTemplateTests = function (OPTIONS, driver) {

    this.canSeeFormTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('#secCall .left fieldset label:nth-child(1) input')).getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in first input')
                }
            })
            .then(async () => (await getElementByCss('#secCall .left fieldset label:nth-child(2) input')).getAttribute('required'))
            .then(data => {
                if (data = null){
                    assert.ok(false,'can not find required attribute in second input')
                }
            })
    };
    this.canNotLeaveEmptyFormTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('#secCall .left fieldset label:nth-child(1) input')))
            .then(() => setUserName(''))
            .then(() => setUserPhone(''))
            .then(() => offDebugBar())
            .then(async () => (await getElementByCss('#secCall .left fieldset button')).click())
            .then(()=> driver.findElements(By.css('fieldset .error')))
            .then(elements => {
                if(elements.length !== 2){
                    assert.ok(false,'Two .error are not found')
                }
            })
    };
    this.emptyUserPhoneTest =  function () {
    
        return driver.get(OPTIONS.site)
            .then(async() => (await getElementByCss('#secCall .left fieldset label:nth-child(1) input')))    
            .then(() => setUserName(fakeUserData.name))
         	.then(() => setUserPhone(''))
            .then(() => offDebugBar())
            .then(async () => (await getElementByCss('#secCall .left fieldset button')).click())
            .then(async () => (await getElementByCss('fieldset .error input')).getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_phone', 'There is no .error in userPhone label'))
    };
    this.emptyUserNameTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('#secCall .left fieldset label:nth-child(1) input')))
            .then(() => setUserName(''))
            .then(() => setUserPhone(fakeUserData.phone))
            .then(() => offDebugBar())
            .then(async () => (await getElementByCss('#secCall .left fieldset button')).click())
            .then(async () => (await getElementByCss('fieldset .error input')).getAttribute('name'))
            .then(fieldName => assert.equal(fieldName,'user_name', 'There is no .error in userName label'))
    };
    this.canSuccessfullyAskForCallTest =  function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('#secCall .left input')))
            .then(() => setUserName(fakeUserData.name))
         	.then(() => setUserPhone(fakeUserData.phone))
            .then(() => offDebugBar())
            .then(async () => (await getElementByCss('#secCall .left fieldset button')).click())
            .then(async () => (await getElementByCss('#thanks h2')).getText())
            .then(thanks => assert.equal(thanks,'Спасибо!', 'User did not ask for a call'))
    };

  function getElementByCss(path) {
        return driver.wait(until.elementLocated(By.css(path), 8000))
            .then(() => driver.sleep(1000))
            .then(()=> {
                return driver.findElement(By.css(path))
            });
    }
    function setUserName(userName){
    	 driver
    	 	.then(() => driver.findElement(By.name('user_name')).click())
            .then(() => driver.findElement(By.name('user_name')).clear())
            .then(() => driver.findElement(By.name('user_name')).sendKeys(userName))
    }
    function setUserPhone(userPhone){
    	 driver
    	 	.then(() => driver.findElement(By.name('user_phone')).click())
            //.then(() => driver.findElement(By.name('user_phone')).clear())
            .then(() => driver.findElement(By.name('user_phone')).sendKeys(userPhone))
    }
    function offDebugBar(){
		driver.findElement(By.css('.phpdebugbar-close-btn')).click()
            .catch(() => {});
	};

};
module.exports = AskForCallTemplateTests;