import {test} from "@playwright/test";
import log from 'loglevel';
import assuranceAuto from "../pages/assuranceAuto";
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


    test("T1. Verfiy Header", async ({ page, context },testInfo)=> {
        //Gestion des cookies
        let pageCookies: cookies = new cookies(page);
        await pageCookies.continuerSansAccepter()
        let pageAssurance: assuranceAuto = new assuranceAuto(page);
        await pageAssurance.isPageOpened(result)
        //Verification of Logo
        await pageAssurance.verifLogo(result,page)
        //Verification of Code de la route
        await pageAssurance.verifCode(result,page)
        //Verification of Permis de conduire
        await pageAssurance.verifPermis(result,page)
        //Verification of Assurance auto
        await pageAssurance.verifAssurance(result,page)
        //Verification of Connexion
        await pageAssurance.verifConnexion(result,page)
    })


})