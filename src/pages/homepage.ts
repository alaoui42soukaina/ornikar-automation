import * as selectors from '../selectors/homepage.json';
import { Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export default class homepage extends BasePage {
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


}