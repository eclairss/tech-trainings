//let EmployeeDTO = require('../pages/EmployeeDTO');
class EmployeesPage { 
    constructor ()
    {
        this.createNew = element(by.linkText('Create New'));
        this.employeesTable = $$('table.table > tbody > tr');
    }

    clickCreateNew = async () =>
    {
        await this.createNew.click();
    }

    //returns a list of match tr elements
    searchEmployees = async (employeeDTO) => {
        return await this.employeesTable.filter( (row) => {
            return row.getText().then( (text) => {
                    let match = false;
                    if(text.indexOf(employeeDTO.firstname) !== -1){ //contains firstname
                        if(text.indexOf(employeeDTO.lastname) !== -1){ //contains lastname
                            match = true;
                        }
                    }
                    return match;
                });
        });
    }

    deleteEmployee = async (employeeDTO) => {       
        let matches = await this.employeesTable.filter( (row) => {
                return row.getText().then( (text) => {
                        let match = false;
                        if(text.indexOf(employeeDTO.firstname) !== -1){ //contains firstname
                            if(text.indexOf(employeeDTO.lastname) !== -1){ //contains lastname
                                match = true;
                            }
                        }
                        return match;
                    });
            });

        if(matches.length>0){
            await matches[0].element(by.linkText('Delete')).click();
            return true;
        }
    }
}

module.exports = EmployeesPage;