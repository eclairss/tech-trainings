class MoviesPage {
    constructor() {
        this.movieCards = $$('div.movie-card');
    }

    getAllMovieDateMatches = async() => {
        let schedules = [];

        for await(let card of await this.movieCards){

            let schedule = {
                movie: await card.$('div:nth-child(2)>a').getText(), //assign to movie
                //release: new Date(await datetime)
            };

            schedules.push(schedule);
        }

        return schedules;
   
    }

    clickViewTrailer = async(title) => {
        let card = await this.movieCards.filter( (cards) => {
            return cards.getText().then( (content) =>{
                return content.indexOf(title) !== -1;
            });
        }).first();
        await card.element(by.buttonText('View Trailer')).click();
    }

    clickGetTicket = async(title) => {

        let card = await this.movieCards.filter( (cards) => {
                return cards.getText().then( (content)=> {
                    return content.indexOf(title) !== -1;
                });
        }).first();
        await card.element(by.buttonText('Get Ticket')).click();
    }
}

module.exports = MoviesPage;