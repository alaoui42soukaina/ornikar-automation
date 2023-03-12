import * as selectors from '../selectors/code.json';
import { Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export default class code extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async isPageOpened(result: resultType): Promise<resultType> {
        let isVisible = await this.page.isVisible(selectors.pageTitle)
        if(! isVisible){
            result.reportMsg = result.reportMsg + "The title 'Code de la Route' is not visible" + '\n';
            result.testState = "failed";
        }
        return result
    }


}