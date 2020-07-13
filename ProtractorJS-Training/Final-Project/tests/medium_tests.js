let HomePage = require('../pages/HomePage');
let LoginPage = require('../pages/LoginPage');
let AdminPage = require('../pages/AdminPage');

let BranchDTO = require('../dto/BranchDTO');
let UserDTO = require('../dto/UserDTO');

const Enums = require('../utilities/enums');
const DataProvider = require('../utilities/dataprovider');

describe('medium test/s', () => {

    beforeEach( ()=>{
        this.adminPage = new AdminPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
    });

    it('V. Add Cinema to branch', async() => {
        
        const branchDTO = new BranchDTO(false,null);
        const existingAdminDTO = new UserDTO(false,{'email':'admin@admin.com','password':'password'});

        await this.homePage.open('/');

        // 1. Login Admin Account
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGIN);
        await this.loginPage.enterEmail(existingAdminDTO.email);
        await this.loginPage.enterPassword(existingAdminDTO.password);
        await this.loginPage.clickLogin();

        // 2. Click the Admin menu tab
        await this.homePage.clickNavBar(Enums.NavBarLinks.ADMIN);

        // 3. Select Branch from Maintain  Module4
        await this.adminPage.selectModuleByText(Enums.Modules.BRANCH);

        // 4. Click random Branch name link (your code should be flexible on what branch to
        // select from the available list)
        let branchObj = await this.adminPage.section_viewBranches.fn_openBranchByIndex(Enums.Options.RANDOM);
        branchDTO.name = await branchObj.text;
        branchDTO.id = await branchObj.href;        
        branchDTO.addCinema(DataProvider.MakeCinema());

        // 5. Click Add Cinema button
        await this.adminPage.section_editBranch.fn_clickAddCinema();
        // 6. Specify Cinema name
        await this.adminPage.section_addCinema.fn_enterCinema(branchDTO.cinema[0]);
        // 7. Click Add button
        await this.adminPage.section_addCinema.fn_clickAdd();

        //8. VERIFY newly created cinema is displayed on Branch page
        await expect(await this.adminPage.section_editBranch.fn_isCinemaPresent(branchDTO.cinema[0])).toBe(true,`Verify ${branchDTO.cinema[0]} is present in cinema list.`);

        // 9. Click View Schedules button
        await this.adminPage.section_editBranch.fn_clickViewSchedule();

        // 10. Click Add Movie Schedule button
        await this.adminPage.section_viewSchedules.fn_clickAddMovieSchedule();

        // 11. Click Select Cinema dropdown
        await this.adminPage.section_addSchedule.fn_clickCinema();

        // 12. VERIFY newly created cinema is displayed on dropdown menu     
        await expect(await this.adminPage.section_addSchedule.fn_isCinemaPresent(branchDTO.cinema[0])).toBe(true,`Verify ${branchDTO.cinema[0]} is present in cinema dropdown.`);
    });
});