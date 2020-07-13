class DepartmentsPage { 
    constructor ()
    {
        this.createNew = element(by.linkText('Create New'));
        this.departmentsTable = $$('table.table > tbody > tr');
    }

    clickCreateNew = async () =>
    {
        await this.createNew.click();
    }

    //returns a list of match tr elements
    searchDepartments = async (department) => {
        return await this.departmentsTable.filter( (row) => {
            return row.$$('*').first().getText().then( (text) => {
                    return text === department;
                });
        });
    }

    deleteDepartment = async (department) => {       
        let matches = await this.departmentsTable.filter( (row) => {
            return row.$$('*').first().getText().then( (text) => {
                return text === department;
            });
        });//.first().element(by.linkText('Delete')).click();
        //let matches = await searchDepartments(department);

        if(matches.length>0){
            await matches[0].element(by.linkText('Delete')).click();
            return true;
        }
    }
}

module.exports = DepartmentsPage;