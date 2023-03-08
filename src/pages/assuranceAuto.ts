import * as selectors from '../selectors/assuranceAuto.json';
import { Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import {expectEquals} from "../common/CommonFunctions";
import log from "loglevel";
let step = ""

export default class assuranceAuto extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async isPageOpened(result: resultType): Promise<resultType> {
        let isVisible = await this.page.isVisible(selectors.pageTitle)
        if(! isVisible){
            result.reportMsg = result.reportMsg + "The title 'L assurance auto Ornikar se réinvente' is not visible" + '\n';
            result.testState = "failed";
        }
        return result
    }

    public async clickSubcribeEmail(): Promise<void> {
        await this.page.click(selectors.tenezMoiAuCourant);
        await this.waitTillHTMLRendered();
    }

}