const DataProvider = require('../utilities/dataprovider');

class BranchDTO {
    constructor(fromDataProvider, obj) {
        let dpObj = DataProvider.MakeBranch();

        if(fromDataProvider){
            if(obj===null){
                obj = dpObj;
            }
            else{   
                if(!obj.name) obj.name = dto.name;
                if(!obj.address) obj.address = dto.address;
            }
        }

        if(obj !== null){
            this.name = obj.name;
            this.address = obj.address;
        }
    }

    addCinema = async(cinema) => {
        if(this.cinema == null) this.cinema = [];
        this.cinema.push(cinema);
    }
}

module.exports = BranchDTO;