import {test} from "@playwright/test";
import log from 'loglevel';
import assuranceAuto from "../pages/assuranceAuto";
import formEmailSubscription from "../pages/formEmailSubscription";
import {result, resetResult, pushTestResults} from "@/common/CommonFunctions";
import config from "@/config/config.json";

log.setDefaultLevel(log.levels.DEBUG);

test.describe("Assurance Auto test suite ", () => {


    test.beforeAll(async () => {
    });

    test.beforeEach(async ({ page }) => {
        await resetResult
        await page.goto(config.baseUrls.prod);
    });

    test.afterEach(async ({ }, testInfo) => {
        await pushTestResults(testInfo)
    })

    test.afterAll(async () => {
    });


    test("T2. subscribe to receive emails", async ({ page, context },testInfo)=> {
        let pageAssurance: assuranceAuto = new assuranceAuto(page);
        await pageAssurance.isPageOpened(result)
        await pageAssurance.clickSubcribeEmail()
        let form: formEmailSubscription = new formEmailSubscription(page);
        await form.isPopupOpened(result)
        let insuranceDate = new Date();
        insuranceDate.setDate(insuranceDate.getDate() + 365);
        let jour = insuranceDate.getDay()
        let mois = insuranceDate.getMonth()
        let year = insuranceDate.getFullYear()
        await form.inputInsuranceDate(jour,mois,year)
        await form.clickOK()
    })


})