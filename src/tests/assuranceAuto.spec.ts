import {chromium, test} from "@playwright/test";
import log from 'loglevel';
import assuranceAuto from "../pages/assuranceAuto";
import formEmailSubscription from "../pages/formEmailSubscription";
import {result, resetResult, pushTestResults} from "@/common/CommonFunctions";
import config from "@/config/config.json";
import cookies from "@/pages/cookies";


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
        //Gestion des cookies
        let pageCookies: cookies = new cookies(page);
        await pageCookies.continuerSansAccepter()
        //Souscription à l'email
        let pageAssurance: assuranceAuto = new assuranceAuto(page);
        await pageAssurance.isPageOpened(result)
        await pageAssurance.clickSubcribeEmail()
        let form: formEmailSubscription = new formEmailSubscription(page);
        await form.isPopupOpened(result)
        let insuranceDate = new Date();
        insuranceDate.setDate(insuranceDate.getDate() + 365);
        console.log('insurance date: ' +insuranceDate)
        let jour = insuranceDate.getDate()
        console.log('insurance jour: ' +jour)
        let mois = insuranceDate.getMonth()
        console.log('insurance mois: ' +mois)
        let year = insuranceDate.getFullYear()
        console.log('insurance year: ' +year)
        await form.inputInsuranceDate(jour,mois,year)
        await form.clickOK()
    })

    test("T1. Verfiy Header", async ({ page, context },testInfo)=> {
        //Gestion des cookies
        let pageCookies: cookies = new cookies(page);
        await pageCookies.continuerSansAccepter()
        let pageAssurance: assuranceAuto = new assuranceAuto(page);
        await pageAssurance.isPageOpened(result)
        //Verification of Logo

    })


})