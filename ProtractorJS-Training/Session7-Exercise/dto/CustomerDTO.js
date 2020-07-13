class CustomerDTO { 
    constructor (firstname, lastname, postcode){
        this.firstname = firstname;
        this.lastname = lastname;
        this.postcode = postcode;
        this.accountNo = '';
    }

    fullname = () => {
        return (this.firstname + " " +  this.lastname);
    }
}

module.exports = CustomerDTO;