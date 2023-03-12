import * as selectors from '../selectors/assuranceAuto.json';
import { Page } from "@playwright/test";
import { BasePage } from "../common/BasePage";
import {expectEquals} from "../common/CommonFunctions";
import homepage from "@/pages/homepage";
import code from "@/pages/codeDeLaRoute";
import connexion from "@/pages/connexion";

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

    public async verifLogo(result: resultType, page :Page): Promise<resultType> {
        await this.isElementPresent(selectors.logo,result, "Verification of Ornikar Logo")
        //Let's verify that clicking on the logo will take us to the homepage
        await this.page.click(selectors.logo);
        await this.waitTillHTMLRendered();
        let currentURL = await this.page.url()
        let expectedURL = "https://www.ornikar.com/"
        expectEquals(expectedURL,currentURL,result)
        let Homepage: homepage = new homepage(page);
        await Homepage.isPageOpened(result)
        return result
    }

    public async verifCode(result: resultType, page :Page): Promise<resultType> {
        await this.isElementPresent(selectors.code,result, "Verification of heading 'Code de la route'")
        //Let's verify that clicking on the heading will take us to the corresponding page
        await this.page.click(selectors.code);
        await this.waitTillHTMLRendered();
        let currentURL = await this.page.url()
        let expectedURL = "https://www.ornikar.com/code"
        expectEquals(expectedURL,currentURL,result)
        let Code: code = new code(page);
        await Code.isPageOpened(result)
        return result
    }

    public async verifPermis(result: resultType, page :Page): Promise<resultType> {
        await this.isElementPresent(selectors.permisMenu,result, "Verification of heading 'Permis de conduire'")
        //Let's verify that hovering on the heading will show the menu items and clicking on them will lead to the corresponding pages
        await this.verifSubCategoriePermis(selectors.permisB,'https://www.ornikar.com/permis','permis B' ,result)
        await this.verifSubCategoriePermis(selectors.conduiteAccompagnee,'https://www.ornikar.com/conduite-accompagnee','Conduite Accompagnée' ,result)
        await this.verifSubCategoriePermis(selectors.conduiteALaCarte,'https://www.ornikar.com/conduite','Conduite A La Carte' ,result)
        await this.verifSubCategoriePermis(selectors.financementCPF,'https://www.ornikar.com/permis/demarches/financer-permis/cpf','Financement CPF' ,result)
        return result
    }

    public async verifSubCategoriePermis(subCatSelector:string,subCatURL:string,subCategorie:string ,result: resultType): Promise<resultType> {
        await this.page.hover(selectors.permisMenu);
        await this.isElementPresent(subCatSelector,result, "Verification of menu item '"+ subCategorie +"'")
        await this.page.click(subCatSelector);
        let currentURL = await this.page.url()
        expectEquals(subCatURL,currentURL,result)
        return result
    }
    public async verifAssurance(result: resultType, page :Page): Promise<resultType> {
        await this.isElementPresent(selectors.assurance,result, "Verification of heading 'Assurance auto'")
        //Let's verify that clicking on the heading will take us to the corresponding page
        await this.page.click(selectors.assurance);
        await this.waitTillHTMLRendered();
        let currentURL = await this.page.url()
        let expectedURL = "https://www.ornikar.com/assurance-auto"
        expectEquals(expectedURL,currentURL,result)
        await this.isPageOpened(result)
        return result
    }

    public async verifConnexion(result: resultType, page :Page): Promise<resultType> {
        await this.isElementPresent(selectors.connexion,result, "Verification of heading 'Connexion'")
        //Let's verify that clicking on the heading will open the Connection page
        await this.page.click(selectors.connexion);
        await this.waitTillHTMLRendered();
        let Connexion: connexion = new connexion(page);
        await Connexion.isPageOpened(result)
        return result
    }

}