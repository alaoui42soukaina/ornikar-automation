import * as selectors from '../selectors/cookies.json';
import { Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";

export default class cookies extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async isPageOpened(): Promise<boolean> {
        let isVisible = await this.page.isVisible(selectors.cookiesPage)
        return isVisible
    }

    public async continuerSansAccepter(): Promise<void> {
        if (this.isPageOpened()){
            await this.page.waitForSelector(selectors.continuerSansAccepter)
            await this.page.click(selectors.continuerSansAccepter);
            await this.waitTillHTMLRendered();
        }
    }

}