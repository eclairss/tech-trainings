class HomePage { 
    constructor ()
    {
        this.homeBtn = $('#homeButton');
        this.manageBtn = element(by.xpath("//a[.='Manage']/parent::li"))
    }

    open = async (url) => {
        await browser.get(url);
    }

    goToDepartmentsPage = async () => {
        await this.hoverAndClick(this.manageBtn,'Departments');
        await browser.sleep(3000);
    }

    goToEmployeePage = async () => {
        await this.hoverAndClick(this.manageBtn,'Employee');
        await browser.sleep(3000);
    }

    hoverAndClick = async (parent, linkText) => {
        let hoverClick = await browser.actions().mouseMove(parent).click(element(by.linkText(linkText)));
        await hoverClick.perform();
    }
}

module.exports = HomePage;