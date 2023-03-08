import { chromium, FullConfig } from '@playwright/test';


async function globalSetup(config: FullConfig) {

    const browser = await chromium.launch();
    const page = await browser.newPage();

}

export default globalSetup;
