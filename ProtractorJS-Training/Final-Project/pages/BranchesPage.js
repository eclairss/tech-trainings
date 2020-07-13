class BranchesPage {
    constructor() {
        this.branchCards = $$('.branch-card');
    }

    clickCheckSchedules = async(branch) => {

        let card = await this.branchCards.filter( (cards) => {
                return cards.getText().then( (content)=> {
                    return content.indexOf(branch) !== -1;
                });
        }).first();
        await card.element(by.buttonText('Check Schedules')).click();
    }
}

module.exports = BranchesPage;