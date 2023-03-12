import * as selectors from '../selectors/formEmailSubscription.json';
import { Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import {expectEquals} from "../common/CommonFunctions";
import log from "loglevel";
let step = ""

export default class formEmailSubscription extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async isPopupOpened(result: resultType): Promise<resultType> {
        let isVisible = await this.page.isVisible(selectors.popUp)
        if(! isVisible){
            result.reportMsg = result.reportMsg + "The popup form is not visible" + '\n';
            result.testState = "failed";
        }
        return result
    }

    public async inputInsuranceDate(jour:number, mois:number, annee:number): Promise<void> {
        //Print Popup Content
        console.log('textContent: ' + await this.page.locator('div.tf-v1-iframe-wrapper').textContent())
        await this.page.waitForSelector(selectors.inputJour);
        await this.page.fill(selectors.inputJour,jour.toString())
        await this.page.fill(selectors.inputMois,mois.toString())
        await this.page.fill(selectors.inputAnnee,annee.toString())
    }


    public async clickOK(): Promise<void> {
        await this.page.click(selectors.buttonOK);
        await this.waitTillHTMLRendered();
    }

}