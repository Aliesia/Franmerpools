const webdriver = require('selenium-webdriver');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;

const HomePageTemplatesTests = function (OPTIONS, driver) {

    this.headerButtonTest =  function () {
        let firstFooterStepName = 'ТЕХНОЛОГИИ';
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('header .button')).click())
            .then(async () => (await getElementByCss('.steps li:nth-child(1) a')).getText())
            .then(stepName => assert.equal(stepName, firstFooterStepName, 'Button is not providing to the right page'));
    };
    this.footerButtonTest =  function () {
        let secondSlideTitle = 'Карта выполненных проектов';
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('footer')).click())
            .then(async () => (await getElementByCss('h2')).getText())
            .then(title => assert.equal(title, secondSlideTitle, 'Button on first template is not providing to the next template'));
    };
    this.canSeeMapTest = function (){
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('h2'))))
            .then(()=> driver.wait(until.elementLocated(By.css('#map'))))
            .catch(()=> assert.ok(false, 'Can not find:#map'))
    };
    this.canSeeVideoTest = function () {
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('#trailerPlayer'))))
            .catch(() => assert.ok(false, 'Can not find element: #trailerPlayer'))
            .then(() => driver.findElement(By.css('.feedfeed')))
            .catch(() => assert.ok(false, 'Can not find element: .feedfeed'))
    };
    this.smallButtonTest = function () {
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('#secFeedback h2'))))
            .then(async () => (await getElementByCss('#secFeedback header a')).getAttribute('href'))
            .catch(() => assert.ok(false, 'link is not found'))
    };
    this.linkButtonTest = function () {
        return driver.get(OPTIONS.site)
            .then(() => driver.wait(until.elementLocated(By.css('#secShowrooms h1'))))
            .then(async () => (await getElementByCss('#secShowrooms header a')).getAttribute('href'))
            .catch(() => assert.ok(false, 'link is not found'))
    };
    this.swipeButtonTest = function () {
    let initialSlide = 0;
    return driver.get(OPTIONS.site)
        .then(async () => (await getElementByCss('#secShowrooms .glider ul')).getAttribute('style'))
        .then(tempData => initialSlide = tempData)
        .then(async () => (await getElementByCss('#secShowrooms .glider .right')).click())
        .then(async () => (await getElementByCss('#secShowrooms .glider ul')).getAttribute('style'))
        .then(newSlider => assert.notEqual(newSlider,initialSlide, 'Slide is not working properly'))
    };
    this.teamImageTest = function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('#secTeam #teamWrap #teamPhoto')).getAttribute('src'))
            .catch(() => assert.ok(false, 'image is not found'))
    };
    this.workerOnTeamImageTest = function () {
        let initialHuman = 0;
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('#secTeam #teamWrap li')).getAttribute('data-n'))
            .then(tempData => initialHuman = tempData)
            .then(async () => (await getElementByCss('#secTeam #teamWrap li:nth-child(2)')).getAttribute('data-n'))
            .then(newHuman => assert.notEqual(newHuman, initialHuman, 'Human can not be found'))
    };
    this.canSeeFormTest = function () {
        return driver.get(OPTIONS.site)
            .then(async () => (await getElementByCss('#secCall .left fieldset label')).getAttribute('input'))
            .catch(() => assert.ok(false, 'form is not found'))
    };

    function getElementByCss(path) {
        return driver.sleep(2000)
            .then(()=> driver.wait(until.elementLocated(By.css(path),8000)))
            .then(()=> {
                return driver.findElement(By.css(path))
            });
    }
};
module.exports = HomePageTemplatesTests;