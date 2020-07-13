let option = require('../utilities/enums');

class CreateEmployeePage {
    constructor () {
        this.firstNameFld = $('#EmpFirstName');
        this.lastNameFld = $('#EmpLastName');
        this.addressFld = $('#EmpAddress');
        this.stateDp = $('#StateID');
        this.cityFld = $('#CityObj_CityName');
        this.departmentDp = $('#DepartmentID');
        this.createBtn = element(by.css("input[value='Create']"));
    }

    enterFirstName = async (firstName) => {
        await this.firstNameFld.clear();
        await this.firstNameFld.sendKeys(firstName);
    }

    enterLastName = async (lastName) => {
        await this.lastNameFld.clear();
        await this.lastNameFld.sendKeys(lastName);
    }

    enterAddress = async (address) => {
        await this.addressFld.clear();
        await this.addressFld.sendKeys(address);
    }

    enterCity = async (city) => {
        await this.cityFld.clear();
        await this.cityFld.sendKeys(city);
    }

    clickCreateBtn = async () => {
        await this.createBtn.click();
    }

    selectStateByIndex = async (index) => {
        await this.stateDp.all(by.css('option')).then( async (options) => {
            let true_index = await this.getTrueIndex(index, options.length);
            await options[true_index].click();
       });
    }

    selectDepartmentByIndex = async (index) => {
        await this.departmentDp.all(by.css('option')).then( async (options) => {
            let true_index = await this.getTrueIndex(index, options.length);
            await options[true_index].click();
       });
    }

    selectDepartmentByText = async (value) => {
        await this.departmentDp.sendKeys(value);
    }

    getTrueIndex = (index, max) => {
        let true_index = index;
        
        if(index === option.MAX)
        {
            true_index = max - 1;
        }
        else if(index === option.RANDOM)
        {
            true_index = Math.floor(Math.random() * (max-1) + 1);
        }
        else if(index < -2)
        {
            true_index = 0;
        }

        return true_index;
    }

}

module.exports = CreateEmployeePage;