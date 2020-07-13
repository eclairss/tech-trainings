let HomePage = require('../pages/HomePage');
let LoginPage = require('../pages/LoginPage');
let AdminPage = require('../pages/AdminPage');
let MoviesPage = require('../pages/MoviesPage');
let ReservationPage = require('../pages/ReservationPage');
let PaymentPage = require('../pages/PaymentPage');

const BranchDTO = require('../dto/BranchDTO');
const UserDTO = require('../dto/UserDTO');
const ScheduleDTO = require('../dto/ScheduleDTO');
const PaymentDTO = require('../dto/PaymentDTO');

const Enums = require('../utilities/enums');
const DataProvider = require('../utilities/dataprovider');
const { DateTimeHelper } = require('../utilities/helpers');


describe('hard tests', () => {

    beforeEach( ()=>{
        this.adminPage = new AdminPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.moviesPage = new MoviesPage();
        this.reservationPage = new ReservationPage();
        this.paymentPage = new PaymentPage();
    });
    
    it('VIII. Admin Reservation', async() => {
        const existingAdminDTO = new UserDTO(true,{email:'admin@admin.com',password:'password'}); //existing admin
        const branchDTO = new BranchDTO(false,null);

        const reservation1DTO = {
            user: existingAdminDTO,
            branch: branchDTO,
            payment: new PaymentDTO(null,'4111111111111111', '123', '1223'),
            schedule: new ScheduleDTO(DataProvider.MakeMovies(), 300, DateTimeHelper.GetDate(3) + ' 10:30'),
            seats: []
        }

        await this.homePage.open('/');

        // 1. Login Admin Account
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGIN);
        await this.loginPage.enterEmail(existingAdminDTO.email);
        await this.loginPage.enterPassword(existingAdminDTO.password);
        await this.loginPage.clickLogin();

        // 2. Click the Admin menu
        await this.homePage.clickNavBar(Enums.NavBarLinks.ADMIN);

        // 3. Select Branch from dropdown
        await this.adminPage.selectModuleByText(Enums.Modules.BRANCH);

        // 4. Click random Branch name link
        let branchObj = await this.adminPage.section_viewBranches.fn_openBranchByIndex(Enums.Options.RANDOM);
        branchDTO.name = await branchObj.text;
        branchDTO.id = await branchObj.href;

        // 5. Verify if there is/are a cinema/s existing under Cinemas.
        let cinemaCount = await this.adminPage.section_editBranch.fn_getCinemaCount();
        //@CHECK - Does verify mean we have to use expect()??
        //await expect(cinemaCount).toBeGreaterThan(0);
        
        // If no cinema name is existing, click Add Cinema, fill out name, and click Add, else proceed to next step
        if(cinemaCount < 1){
            await this.adminPage.addCinema(DataProvider.MakeCinema());
        }

        
        //6. Click an existing cinema. Input 5 on rows, 20 on columns, and click Update
        //get first cinema name
        let cinemaObj = await this.adminPage.section_editBranch.fn_openCinemaByIndex(Enums.Options.RANDOM);
        await branchDTO.addCinema(cinemaObj.text);
        let rows = 5;
        let columns = 20;
        await this.adminPage.createSeatMap(rows,columns);
        await this.adminPage.section_editCinema.fn_clickUpdate();

        // 7. Click View Schedules button
        await this.adminPage.section_editBranch.fn_clickViewSchedule();

        // 8. Click Add Movie Schedule
        await this.adminPage.section_viewSchedules.fn_clickAddMovieSchedule();

       // 9. Populate following fields
       // a. Cinema (the one from step 6)
       await this.adminPage.section_addSchedule.fn_selectCinemaByText(branchDTO.cinema[0]);
       // b. Movie
       await this.adminPage.section_addSchedule.fn_selectMovieByText(reservation1DTO.schedule.movie);
       // c. Date
       await this.adminPage.section_addSchedule.fn_enterStartDate(reservation1DTO.schedule.getDate());
       // d. Time
       await this.adminPage.section_addSchedule.fn_setHours(reservation1DTO.schedule.datetime.getHours());
       await this.adminPage.section_addSchedule.fn_setMinutes(reservation1DTO.schedule.datetime.getMinutes());
       // e. Price
       await this.adminPage.section_addSchedule.fn_enterPrice(reservation1DTO.schedule.price);

        // 10. Click Add button
        await this.adminPage.section_addSchedule.fn_clickAdd();

        // 11. Navigate to Movies Tab
        await this.homePage.clickNavBar(Enums.NavBarLinks.MOVIES);

        // 12. Click "Get Ticket" for the movie schedule created from step 9
        await this.moviesPage.clickGetTicket(reservation1DTO.schedule.movie);

        // 13. Select the branch and cinema (selected from previous steps)
        //await expect(JSON.stringify(this.branchDTO)).toBe(0);
        await this.reservationPage.selectBranchByText(branchDTO.name);
        await this.reservationPage.selectCinemaByText(branchDTO.cinema[0]);

        // 14. Choose date and time (from step)
        await this.reservationPage.selectDateByText(reservation1DTO.schedule.getDate(0));
        await this.reservationPage.selectTimeByText(reservation1DTO.schedule.getTime(0).toLowerCase());

        // 15. Reserve 10 seats and confirm reservation
        reservation1DTO.seats = await this.reservationPage.selectRandomSeats(10);
        //await expect(JSON.stringify(seats)).toBe(0);

        await this.reservationPage.clickConfirmReservationBtn();


        // 16. Verify the ff details from reservation should be displayed
        let ticketDetails = await this.reservationPage.dialogBox.fn_getTicketSummaryDetails();
            // a. Ticket Summary dialog box with Ticket Summary text is displayed
            await expect(await this.reservationPage.dialogBox.fn_getTitle()).toBe('Ticket Summary','Verify Ticket Summary text is displayed in the dialog box.');
            
            // b. Branch name
            await expect(ticketDetails.branch).toBe(branchDTO.name, `[Ticket Summary] \tVerify that branch name is ${branchDTO.name} in the ticket details.`);
            
            // c. Cinema name
            await expect(ticketDetails.cinema).toBe(branchDTO.cinema[0], `[Ticket Summary] \tVerify that ciname name is ${branchDTO.cinema[0]} in the ticket details.`);
            
            // d. Movie name
            await expect(ticketDetails.movie).toBe(reservation1DTO.schedule.movie, `[Ticket Summary] \tVerify that movie is ${reservation1DTO.schedule.movie} in the ticket details.`);
            
            // e. Date
            // f. Time
            await expect(ticketDetails.datetime).toEqual(reservation1DTO.schedule.datetime, `[Ticket Summary] \tVerify that schedule date is ${reservation1DTO.schedule.datetime} in the ticket details.`);

            // g. Price
            await expect(ticketDetails.price).toBe(reservation1DTO.schedule.price, `[Ticket Summary] \tVerify that price is ${reservation1DTO.schedule.price} in the ticket details.`);

            // h. Seats selected
            await expect(ticketDetails.seats).toEqual(reservation1DTO.seats, `[Ticket Summary] \tVerify that seats ${reservation1DTO.schedule.seats} are in the ticket details.`);

        // 17. Proceed to payment
        await this.reservationPage.dialogBox.fn_clickFooterBtn('Proceed to Payment');
        // 18. Verify payment summary details are correct base from the previous inputs (description
        // and total amount)
        let paymentDetails = await this.paymentPage.getPaymentSummaryDetails();
         // Branch name
         await expect(paymentDetails.description[1]).toBe(branchDTO.name, `[Payment Summary] \tVerify that branch name is ${branchDTO.name} in the payment summary.`);
            
         // Cinema name
         await expect(paymentDetails.description[2]).toBe(branchDTO.cinema[0], `[Payment Summary] \tVerify that cinema name is ${branchDTO.cinema[0]} in the payment summary.`);
         
         // Movie name
         await expect(paymentDetails.description[0]).toBe(reservation1DTO.schedule.movie, `[Payment Summary] \tVerify that cinema name is ${reservation1DTO.schedule.movie} in the payment summary.`);
         
         // Date
         // Time
         await expect(new Date(paymentDetails.description[3])).toEqual(reservation1DTO.schedule.datetime, `[Payment Summary] \tVerify that schedule date is ${reservation1DTO.schedule.datetime} in the payment summary.`);

         // Price
         await expect(Number.parseFloat(paymentDetails.total.replace(/,/g, ''))).toBe(Number.parseFloat(reservation1DTO.schedule.price * reservation1DTO.seats.length),
            `[Payment Summary] \tVerify that total price is ${reservation1DTO.schedule.price * reservation1DTO.seats.length} in the payment summary.`);

         // Seats selected
         await expect(paymentDetails.description[4].split(', ')).toEqual(reservation1DTO.seats, `[Payment Summary] \tVerify that seats ${reservation1DTO.seats} are in the ticket details.`);


        // 19. Input Cardholder name, credit card no., cvv and expiry
        await this.paymentPage.enterCardholderName(reservation1DTO.user.getFullName());
        await this.paymentPage.enterCreditCardNo(reservation1DTO.payment.cardNumber);
        await this.paymentPage.enterCVV(reservation1DTO.payment.cvv);
        await this.paymentPage.enterCCExpiryDate(reservation1DTO.payment.expiryDate);

        // 20. Proceed to payment
        await this.paymentPage.clickProceed();

        //await browser.sleep(3000);
        
        // 21. Verify the ff details from reservation should be displayed
        let confirmPaymentDetails = await this.paymentPage.dialogBox.fn_getConfirmedReservationDetails();
        //await expect(JSON.stringify(confirmPaymentDetails)).toBe(0);
            // a. Confirmed Reservation dialog box with text "Your receipt has been sent to your
            // email."
            await expect(await this.paymentPage.dialogBox.fn_getConfirmationMsg()).toBe('Your receipt has been sent to your email.','Verify correct text is displayed in the dialog box.');
            
            // b. Branch name
            await expect(confirmPaymentDetails.branch).toBe(branchDTO.name, `[Confirm Payment] \tVerify that branch is ${branchDTO.name} in the reservation confirmation details.`);
            
            // c. Cinema name
            await expect(confirmPaymentDetails.cinema).toBe(branchDTO.cinema[0], `[Confirm Payment] \tVerify that cinema is ${branchDTO.cinema[0]} in the reservation confirmation details.`);
            
            // d. Movie name
            await expect(confirmPaymentDetails.movie).toBe(reservation1DTO.schedule.movie, `[Confirm Payment] \tVerify that movie is ${reservation1DTO.schedule.movie} in the reservation confirmation details.`);
            
            // e. Date
            // f. Time
            await expect(confirmPaymentDetails.datetime).toEqual(reservation1DTO.schedule.datetime, `[Confirm Payment] \tVerify that schedule date is ${reservation1DTO.schedule.datetime} in the reservation confirmation details.`);

            // g. Price
            await expect(confirmPaymentDetails.price).toBe(reservation1DTO.schedule.price, `[Confirm Payment] \tVerify that cinema name is ${reservation1DTO.schedule.price} in the reservation confirmation details.`);

            // h. Seats selected
            await expect(confirmPaymentDetails.seats).toEqual(reservation1DTO.seats, `[Confirm Payment] \tVerify that seats ${reservation1DTO.seats} in the reservation confirmation details.`);
            
            // i. # of seats
            await expect(confirmPaymentDetails.numSeats).toEqual(reservation1DTO.seats.length, `[Confirm Payment] \tVerify there are ${reservation1DTO.seats.length} seats in the reservation confirmation details.`);

            // j. Total
            await expect(confirmPaymentDetails.total).toEqual(Number.parseFloat(reservation1DTO.schedule.price * reservation1DTO.seats.length),
                `[Confirm Payment] \tVerify that total price is ${reservation1DTO.schedule.price * reservation1DTO.seats.length} in the reservation confirmation details.`);

        await this.paymentPage.dialogBox.fn_closeDialogBox();

        // 23. Verify the admin user should navigated to Movies tab
        await expect(await this.homePage.getActiveNavBar()).toBe('Movies', 'Verify user is back to Movies tab/page.');
    });
});