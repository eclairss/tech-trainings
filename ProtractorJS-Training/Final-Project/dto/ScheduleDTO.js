const DateTimeHelper = require('../utilities/helpers').DateTimeHelper;

class ScheduleDTO{
    constructor(movie, price, datetime) {
        this.movie = movie;
        this.price = Number.parseFloat(price);

        if( datetime || datetime === '')
            this.datetime = new Date(datetime);
    }

    setDateTime(date, time){
        this.datetime = new Date(date + ' ' + time);
    }

    getTime(){
        return DateTimeHelper.FormatTime(this.datetime, 'en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
    }

    getDate(){
        return DateTimeHelper.FormatDate(this.datetime,'yyyy-mm-dd');
    }
}

module.exports = ScheduleDTO;