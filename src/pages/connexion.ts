import * as selectors from '../selectors/connexion.json';
import { Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export default class connexion extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async isPageOpened(result: resultType): Promise<resultType> {
        let isVisible = await this.page.isVisible(selectors.pageTitle)
        if(! isVisible){
            result.reportMsg = result.reportMsg + "The title 'Je me connecte a' is not visible" + '\n';
            result.testState = "failed";
        }
        return result
    }


}