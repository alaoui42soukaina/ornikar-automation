import { Page, Response, ElementHandle } from "@playwright/test";
import log from "loglevel";
import {expectEquals} from "./commonFunctions";

/**
 * Contains all common actions on web elements
 *
 * @class BasePage
 */
export class BasePage {
    public page: Page;

    /**
     * @constructor
     * @param page - Current Web Page
     */
    constructor(page: Page) {
        this.page = page;
    }


    /**
     * Gets the URL of the current page
     * @returns URL of the page attribute
     */
    protected getUrl(): string {
        return this.page.url();
    }


    /**
     * Gets an element
     * @param selector - Element's selector
     * @returns Element corresponding to the given selector
     */
    public async getElement(selector: string): Promise<ElementHandle<Element>> {
        let elem: ElementHandle<Element> = await this.page.$(selector);
        return elem;
    }



    /**
     * Checks if an element is present on the page
     * @param selector - Element's selector
     * @param {reportMsg: string; testState: string} result (Optional) The error messages and testState (failed or passed)
     * @param verificationTitle (Optional) The title of the verification step
     * @returns True is the specified attribute is present on the element
     */
    protected async isElementPresent(selector: string, result?: {reportMsg: string; testState: string}, verificationTitle?:string): Promise<boolean> {
        let isPresent = true;
        await this.getElement(selector).catch(() => {
            isPresent = false;
            if (result){
                if(verificationTitle) {result.reportMsg = result.reportMsg + '\n - ' + verificationTitle}
                result.reportMsg = result.reportMsg + '\n' + "The following element is not present in the page : '" + selector + "'" + '\n';
                result.testState = "failed";
            }
        });
        return isPresent;
    }


    /**
     * Waits until the HTML is fully rendered for the current page
     * @param timeout - Maximum wait time in milliseconds, defaults to 40 seconds
     */
    public async waitTillHTMLRendered(timeout: number = 40000): Promise<void> {
        const checkDurationMsecs = 1000;
        const maxChecks = timeout / checkDurationMsecs;
        let lastHTMLSize = 0;
        let countStableSizeIterations = 0;
        const minStableSizeIterations = 3;

        log.debug("Wait till HTML rendered for ", await this.getUrl());
        for (let checkCounts = 1; checkCounts <= maxChecks; checkCounts++) {
            let html = await this.page.content();
            let currentHTMLSize = html.length;

            let bodyHTMLSize = await this.page.evaluate(
                () => document.body.innerHTML.length
            );

            log.debug(
                "last: ",
                lastHTMLSize,
                " <> curr: ",
                currentHTMLSize,
                " body html size: ",
                bodyHTMLSize
            );

            if (lastHTMLSize != 0 && currentHTMLSize === lastHTMLSize) {
                countStableSizeIterations++;
            } else {
                countStableSizeIterations = 0; //reset the counter
            }

            if (countStableSizeIterations >= minStableSizeIterations) {
                log.debug("Page rendered fully..");
                break;
            }

            lastHTMLSize = currentHTMLSize;
            await this.page.waitForTimeout(checkDurationMsecs);
        }
    }


}
