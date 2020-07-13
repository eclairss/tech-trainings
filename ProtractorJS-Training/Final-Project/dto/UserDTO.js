const DataProvider = require('../utilities/dataprovider');

class UserDTO {
    constructor(autopopulate,obj) {
        let dpObj = DataProvider.MakeUser();        
        dpObj.password = 'password';

        if(autopopulate){
                if(obj===null){
                    obj = dpObj;
                }
                else{                    
                    if(!obj.email) obj.email = dpObj.email;
                    if(!obj.password) obj.password = dpObj.password;
                    if(!obj.firstname) obj.firstname = dpObj.firstname;
                    if(!obj.middlename) obj.middlename = dpObj.middlename;
                    if(!obj.lastname) obj.lastname = dpObj.lastname;
                    if(!obj.birthday) obj.birthday = dpObj.birthday;
                }
        }

        if(obj !== null){
            this.email = obj.email;
            this.password = obj.password;
            this.firstname = obj.firstname;
            this.middlename = obj.middlename;
            this.lastname = obj.lastname;
            this.birthday = obj.birthday;
        }
    }

    makeAdmin(){
        this.email = this.firstname+this.lastname+'@admin.com';
        return this;
    }

    getFullName(){
        return this.firstname + ' ' + this.lastname;
    }
}

module.exports = UserDTO;