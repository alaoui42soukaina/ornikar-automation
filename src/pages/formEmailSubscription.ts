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
        await this.page.type(selectors.inputJour,jour.toString())
        await this.page.type(selectors.inputMois,mois.toString())
        await this.page.type(selectors.inputAnnee,annee.toString())
    }


    public async clickOK(): Promise<void> {
        await this.page.click(selectors.buttonOK);
        await this.waitTillHTMLRendered();
    }

}