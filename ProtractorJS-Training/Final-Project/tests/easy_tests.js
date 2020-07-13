let HomePage = require('../pages/HomePage');
let LoginPage = require('../pages/LoginPage');
let RegisterPage = require('../pages/RegisterPage');
let AdminPage = require('../pages/AdminPage');

let UserDTO = require('../dto/UserDTO');
let BranchDTO = require('../dto/BranchDTO');

const Enums = require('../utilities/enums');

describe('easy tests', () => {

    beforeEach( ()=>{
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.registerPage = new RegisterPage();
        this.adminPage = new AdminPage();
    });

    it('I. Create admin acct and verify login', async () => {
        const newAdminDTO = new UserDTO(true,null).makeAdmin();

        await this.homePage.open('/');

        // 1. Click Register
        await this.homePage.clickNavBar(Enums.NavBarLinks.REGISTER);
        
        // // 2. Specify values
        await this.registerPage.enterFirstName(newAdminDTO.firstname);
        await this.registerPage.enterMiddleName(newAdminDTO.middlename);
        await this.registerPage.enterLastName(newAdminDTO.lastname);
        await this.registerPage.enterPassword(newAdminDTO.password);
        await this.registerPage.enterBirthday(newAdminDTO.birthday);

        // // 3. Email should have '@admin.com'        
        await this.registerPage.enterEmail(newAdminDTO.email);
        
        // // 4. Click Register button
        await this.registerPage.clickRegister();

        // // 5. Login to App
        await this.loginPage.enterEmail(newAdminDTO.email);
        await this.loginPage.enterPassword(newAdminDTO.password);
        await this.loginPage.clickLogin();

        // 6. VERIFY Movies, Branches, Admin menu tabs are displayed
        expect(await this.homePage.isNavBarDisplayed(Enums.NavBarLinks.MOVIES)).toBe(true,'Verify Movies Navbar is displayed');
        expect(await this.homePage.isNavBarDisplayed(Enums.NavBarLinks.BRANCHES)).toBe(true,'Verify Branches Navbar is displayed');
        expect(await this.homePage.isNavBarDisplayed(Enums.NavBarLinks.ADMIN)).toBe(true,'Verify Admin Navbar is displayed');

        // 7. VERIFY the registered email in the navigation bar and logout
        expect(await this.homePage.isNavBarDisplayed(newAdminDTO.email)).toBe(true,`Verify ${newAdminDTO.email} is displayed on Navbar.`);
        expect(await this.homePage.isNavBarDisplayed(Enums.NavBarLinks.LOGOUT)).toBe(true,'Verify Logout Navbar is displayed');
    });

    it('II. Create normal user and verify login', async () => {
        const customersDTO = [
            new UserDTO(true,null),
            new UserDTO(true,null)
        ];

        await this.homePage.open('/');

        for await (let cust of customersDTO) {
            // 1. Click Register
            await this.homePage.clickNavBar(Enums.NavBarLinks.REGISTER);
                    
            // 2. Specify values
            // 3. Email should NOT have '@admin.com', use any email
            await this.registerPage.enterEmail(cust.email);
            await this.registerPage.enterPassword(cust.password);
            await this.registerPage.enterFirstName(cust.firstname);
            await this.registerPage.enterMiddleName(cust.middlename);
            await this.registerPage.enterLastName(cust.lastname);
            await this.registerPage.enterBirthday(cust.birthday);

            // 4. Click Register button            
            await this.registerPage.clickRegister();

            // 5. Login to App
            await this.loginPage.enterEmail(cust.email);
            await this.loginPage.enterPassword(cust.password);
            await this.loginPage.clickLogin();

            // 6. VERIFY Movies, Branches menu tabs are displayed. Admin tab should NOT display
            expect(await this.homePage.isNavBarDisplayed(Enums.NavBarLinks.MOVIES)).toBe(true,'Verify Movies Navbar is displayed');
            expect(await this.homePage.isNavBarDisplayed(Enums.NavBarLinks.BRANCHES)).toBe(true,'Verify Branches Navbar is displayed');
            expect(await this.homePage.isNavBarDisplayed(Enums.NavBarLinks.ADMIN)).toBe(false,'Verify Admin Navbar is NOT displayed');

            // 7. VERIFY the registered email in the navigation bar and logout
            await expect(await this.homePage.isNavBarDisplayed(cust.email)).toBe(true,`Verify ${cust.email} is displayed on Navbar.`);
            expect(await this.homePage.isNavBarDisplayed(Enums.NavBarLinks.LOGOUT)).toBe(true,'Verify Logout Navbar is displayed');

            await this.homePage.clickNavBar(Enums.NavBarLinks.LOGOUT);

        } // 8. Repeat steps 1-7 to create another account with different details

        
    });

    it('III. Negative Login Scenarios', async () => {
        await this.homePage.open('/');
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGIN);

        // 1. No email
        await this.loginPage.enterEmail(protractor.Key.TAB);
        // 2. No password
        await this.loginPage.enterPassword(protractor.Key.TAB);

        // 3. Verify the error message
        await expect(await this.loginPage.isErrorPresent('Email is required.')).toBe(true,"Verify email is required.");
        await expect(await this.loginPage.isErrorPresent('Password is required.')).toBe(true,"Verify password is required.");

        // 4. Verify the login button is disabled
        await expect(await this.loginPage.isLoginBtnEnabled()).toBe(false,"Verify login button is disabled.");

        // 5. Input email without "@domain.com"
        await this.loginPage.enterEmail('invalid');

        // 6. Verify the error message
        await expect(await this.loginPage.isErrorPresent('Invalid email.')).toBe(true,"Verify email is valid.");
    });

    it('IV. Add Branches', async() => {
        const existingAdminDTO = new UserDTO(false,{'email':'admin@admin.com','password':'password'});
        const branchesDTO = [
            new BranchDTO(true,null), 
            new BranchDTO(true,null)
        ];

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

        // 4. Verify there are existing branches
        await expect(await this.adminPage.section_viewBranches.fn_getBranchCountInPage()).toBeGreaterThan(0,"Verify there are existing branches.");

        // 5. Add 2 new branches
        for await(let dto of branchesDTO){
            await this.adminPage.addBranch(dto.name, dto.address);
        }
    });
});