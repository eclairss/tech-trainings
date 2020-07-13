const { $ } = require("protractor");

class HomePage {
    constructor() {
        this.movieCards = $$('.movie-card');
        this.navBarLinks = $$('#navbarNav li.nav-item');
        this.activeNavBar = $('li.nav-item > a.active');
    }

    open = async(subURL) => {        
        await browser.get(subURL);
    }

    isNavBarDisplayed = async (linkText) => {
        let navBars = await this.navBarLinks.filter( (item) => {
            return item.getText().then( (content) =>{
                return content == linkText;
            });
        });
        if(navBars.length>0)
            return await navBars[0].isDisplayed();
        else
            return false;
    }

    getActiveNavBar = async () => {
        return await this.activeNavBar.getText();
    }

    clickNavBar = async (linkText) => {
        let navBar = await this.navBarLinks.filter( (item) => {
            return item.getText().then( (content) =>{
                //return content.indexOf(linkText) !== -1;
                return content == linkText;
            });
        }).first();
        await navBar.click();
    }

    clickCardButton = async(title, button) => {
        let card = await this.movieCards.filter( (cards) => {
            return cards.getText().then( (content) =>{
                return content.indexOf(title) !== -1;
            });
        }).first();
        await card.element(by.buttonText(button)).click();
    }
}

module.exports = HomePage;