class EmployeeDTO { 
    constructor (firstname, lastname, address, state, city, department){
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.state = state;
        this.city = city;
        this.department = department;
    }

    fullname = () => {
        return (this.firstname + " " +  this.lastname);
    }
}

module.exports = EmployeeDTO;