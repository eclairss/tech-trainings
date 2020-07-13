class ReservationDTO { //fromDataProvider not yet supported
    constructor(fromDataProvider,customData) {
        if(fromDataProvider){
            let dto = DataProvider.MakeReservation();
                this.movie = dto.movie,
                this.cinema = dto.cinema,
                this.date = dto.date,
                this.time_hours = dto.time_hours,
                this.time_minutes = dto.time_minutes,
                this.price = dto.price
        }
        if(customData !== null){
                this.movie = customData.movie,
                this.cinema = customData.cinema,
                this.date = customData.date,
                this.time_hours = customData.time_hours,
                this.time_minutes = customData.time_minutes,
                this.price = customData.price;
        }
    }
}

module.exports = ReservationDTO;