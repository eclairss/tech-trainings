const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const AdminPage = require('../pages/AdminPage');
const MoviesPage = require('../pages/MoviesPage');
const PaymentPage = require('../pages/PaymentPage');
const ReservationPage = require('../pages/ReservationPage');

const BranchDTO = require('../dto/BranchDTO');
const UserDTO = require('../dto/UserDTO');
const ScheduleDTO = require('../dto/ScheduleDTO');
const PaymentDTO = require('../dto/PaymentDTO');

const Enums = require('../utilities/enums');
const DataProvider = require('../utilities/dataprovider');
const DateTimeHelper = require('../utilities/helpers').DateTimeHelper;


describe('harder tests', () => {

    beforeEach( ()=>{
        this.adminPage = new AdminPage();
        this.loginPage = new LoginPage();
        this.homePage = new HomePage();
        this.moviesPage = new MoviesPage();
        this.reservationPage = new ReservationPage();
        this.paymentPage = new PaymentPage();
    });

    it('VI. Manage Cinema Seat Plan', async() => {
        const existingAdminDTO = new UserDTO(true,{email:'admin@admin.com',password:'password'}); //existing admin
        const branchDTO = new BranchDTO(false,null);

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
            //this.branchDTO.addCinema(DataProvider.MakeCinema());
            //await this.adminPage.addCinema(this.branchDTO.cinema[0]);
            await this.adminPage.addCinema(DataProvider.MakeCinema());
        }

        // 6. Click random Cinema name link under Cinemas
        let cinemaObj = await this.adminPage.section_editBranch.fn_openCinemaByIndex(Enums.Options.RANDOM);
        await branchDTO.addCinema(cinemaObj.text);

        // // 7. Set rows and columns following below order, Enable / Disable seats accordingly (5 row
        // // and 20 columns)
        let rows = 5;
        let columns = 20;
        await this.adminPage.createSeatMap(rows,columns);

        let disabledSeats = [];

        let rowLabels = ['A','B','C','D','E'];
        for (let r = 0; r < rowLabels.length ; r++){
            //disable A0-E2
            for(let c = 0; c < 3 ; c++ ){
                disabledSeats.push(rowLabels[r].concat(c));
            }

            //disable D3-A6
            for(let c = 3; c <= 6-r; c++){
                disabledSeats.push(rowLabels[r].concat(c));
            }

            //disable A13-D16
            for(let c = 16; (c-r) >= 13; c--){
                disabledSeats.push(rowLabels[r].concat(c));
            }            

            //disable A17-E19
            for(let c = 17; c < columns ; c++ ){
                disabledSeats.push(rowLabels[r].concat(c));
            }
        }
        
        await this.adminPage.disableSeats(disabledSeats);

        //8. Click Update button
        await this.adminPage.section_editCinema.fn_clickUpdate();

        // //9. VERIFY if user is navigated back to branch page
        await expect(await this.adminPage.section_editBranch.fn_getHeadingText()).toBe('Edit Branch', 'Verify if user is navigated back to branch page');

        // // 10. Click the updated cinema link11. Verify the 1st added cinema seating arrangement should be same as created
        await this.adminPage.section_editBranch.fn_openCinemaByText(cinemaObj.text);
                //@TODO - verify row and column value + total seats
                // a. Verify the count of disabled seats
                await expect(await this.adminPage.section_editCinema.fn_getDisabledSeatsCount()).toBe(disabledSeats.length,`Verify there are ${disabledSeats.length} disabled seats.`);
                // b. Verify each disabled seats text
                let flag = true;
                for await(let seatNo of disabledSeats){
                    flag = flag && await this.adminPage.section_editCinema.fn_isSeatDisabled(seatNo);
                }
                await expect(flag).toBe(true,`Verify seats ${disabledSeats} are disabled.`);
    });

    it('VII. Add Movie Schedule', async() => {
        const existingAdminDTO = new UserDTO(true,{email:'admin@admin.com',password:'password'}); //existing admin
        const branchDTO = new BranchDTO(false,null);

        const scheduleDTO = new ScheduleDTO('The Avengers', 300, DateTimeHelper.GetDate(3) + ' 10:30');

        const schedulesDTO = //for step 10
        [
            new ScheduleDTO('Avengers: Age of Ultron', 250, DateTimeHelper.GetDate(4) + ' 10:30'),
            new ScheduleDTO('Avengers: Age of Ultron', 250, DateTimeHelper.GetDate(4) + ' 13:00'),
            new ScheduleDTO('Avengers: Age of Ultron', 250, DateTimeHelper.GetDate(4) + ' 15:30'),
            new ScheduleDTO('Spider-Man: Homecoming', 200, DateTimeHelper.GetDate(5) + ' 10:30'), 
            new ScheduleDTO('Spider-Man: Homecoming', 200, DateTimeHelper.GetDate(5) + ' 13:00'), 
            new ScheduleDTO('Spider-Man: Homecoming', 200, DateTimeHelper.GetDate(5) + ' 15:30'), 
            new ScheduleDTO('Captain America: Civil War', 200, DateTimeHelper.GetDate(3) + ' 13:00'),
            new ScheduleDTO('Captain America: Civil War', 200, DateTimeHelper.GetDate(3) + ' 15:30'),
        ]

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

        //get first cinema name
        await branchDTO.addCinema((await this.adminPage.section_editBranch.links_cinema)[0].getText());

        // 6. Click View Schedules button
        await this.adminPage.section_editBranch.fn_clickViewSchedule();

        // 7. Click Add Movie Schedule
        await this.adminPage.section_viewSchedules.fn_clickAddMovieSchedule();

        // 8. Populate following fields (check step 11 for some details)
        // a. Cinema
        await this.adminPage.section_addSchedule.fn_selectCinemaByText(branchDTO.cinema[0]);
        // b. Movie
        await this.adminPage.section_addSchedule.fn_selectMovieByText(scheduleDTO.movie);
        // c. Date
        await this.adminPage.section_addSchedule.fn_enterStartDate(scheduleDTO.getDate());
        // d. Time
        await this.adminPage.section_addSchedule.fn_setHours(scheduleDTO.datetime.getHours());
        await this.adminPage.section_addSchedule.fn_setMinutes(scheduleDTO.datetime.getMinutes());
        // e. Price
        await this.adminPage.section_addSchedule.fn_enterPrice(scheduleDTO.price);
        // 9. Click Add button
        await this.adminPage.section_addSchedule.fn_clickAdd();
        // 10. VERIFY if user is navigated back to Schedule Page
        await expect(await this.adminPage.section_viewSchedules.fn_isThisPagePresent()).toBe(true, 'Verify user is in View schedule page');
        // 11. Repeat steps 6-9 adding two more movies (total 3 movies), with details varying between
        // the three as specified below:
        // a. 3 future dates[+3days , +4days, +5days]
        // b. EACH dates should have 3 time schedule [2.5hrs interval]
        // c. ANY price

        for(const dto of schedulesDTO){
                // Click Add Movie Schedule
                await this.adminPage.section_viewSchedules.fn_clickAddMovieSchedule();

                //Populate following fields (check step 11 for some details)
                    // a. Cinema
                    await this.adminPage.section_addSchedule.fn_selectCinemaByText(branchDTO.cinema[0]);
                    // b. Movie
                    await this.adminPage.section_addSchedule.fn_selectMovieByText(dto.movie);
                    // c. Date
                    await this.adminPage.section_addSchedule.fn_enterStartDate(dto.getDate());
                    // d. Time
                    await this.adminPage.section_addSchedule.fn_setHours(dto.datetime.getHours());
                    await this.adminPage.section_addSchedule.fn_setMinutes(dto.datetime.getMinutes());
                    // e. Price
                    await this.adminPage.section_addSchedule.fn_enterPrice(dto.price);
                
                    //Click Add button
                await this.adminPage.section_addSchedule.fn_clickAdd();
        }
        
        await expect(await this.adminPage.section_viewSchedules.fn_isThisPagePresent()).toBe(true, 'Verify user is in admin View schedules page');
        
        schedulesDTO.push(scheduleDTO); //add to list of schedules to be checked
        
        // 12. VERIFY if newly created movie schedule is displayed (You can select specific cinema from
        // the dropdown to ensure the right cinema is used)
        await this.adminPage.section_viewSchedules.fn_selectCinemaByText(branchDTO.cinema[0]);  
        
        let adminPageSchedules = await this.adminPage.section_viewSchedules.fn_getAllMovieDateMatch();

        for (const dto of schedulesDTO){
                await expect(adminPageSchedules).toContain({
                    movie: dto.movie,
                    datetime: dto.datetime
                }, `Verify this schedule is in the admin schedules list: ${JSON.stringify(dto)}`);
        }

        // 13. Navigate to Movies Tab
        await this.homePage.clickNavBar('Movies');

        // 14. VERIFY if newly created movie schedule is displayed
        let movieTabSchedules = await this.moviesPage.getAllMovieDateMatches();

        for (const dto of schedulesDTO){
            await expect(movieTabSchedules).toContain({
                movie: dto.movie,
            }, `Verify this scheduled movie is in the Movies tab/page: ${JSON.stringify(dto)}`);
        }

    });

    it('IX. Admin and 1 Customer Reservation', async() => {
        const existingAdminDTO = new UserDTO(true,{email:'admin@admin.com',password:'password'}); //existing admin
        const branchDTO = new BranchDTO(false,null);
        const scheduleDTO = new ScheduleDTO(DataProvider.MakeMovies(), 400, DateTimeHelper.GetDate(3) + ' 20:45');
        const paymentDTO = new PaymentDTO(null,'4111111111111111', '123', '1223');

        const reservation1DTO = {
            user: existingAdminDTO,
            branch: branchDTO,
            payment: paymentDTO,
            schedule: scheduleDTO,
            seats: []
        }
        const reservation2DTO = {
            user: new UserDTO(true, {email:'user@user.com'}),
            branch: branchDTO,
            payment: paymentDTO,
            schedule: scheduleDTO,
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

        // 6. Click random Cinema name link under Cinemas
        let cinemaObj = await this.adminPage.section_editBranch.fn_openCinemaByIndex(Enums.Options.RANDOM);
        await branchDTO.addCinema(cinemaObj.text);


        // 6. Click an existing cinema. Input 5 on rows, 20 on columns, and click Update
        let rows = 5;
        let columns = 20;
        await this.adminPage.createSeatMap(rows,columns);
        await this.adminPage.section_editCinema.fn_clickUpdate();

        // 7. Click View Schedules button
        await this.adminPage.section_editBranch.fn_clickViewSchedule();

        // 8. Click Add Movie Schedule
        await this.adminPage.section_viewSchedules.fn_clickAddMovieSchedule();

        // 9. Populate following fields (check step 11 for some details)
        // a. Cinema
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

        // 13. Select the branch and cinema (from schedule created on step 9)
        await this.reservationPage.selectBranchByText(branchDTO.name);
        await this.reservationPage.selectCinemaByText(branchDTO.cinema[0]);

        // 14. Choose date and time (from schedule created on step 9)
        await this.reservationPage.selectDateByText(reservation1DTO.schedule.getDate())
        await this.reservationPage.selectTimeByText(reservation1DTO.schedule.getTime());

        // 15. Reserve 10 seats and confirm reservation
        reservation1DTO.seats = await this.reservationPage.selectRandomSeats(10);
        await this.reservationPage.clickConfirmReservationBtn();

        // 16. Proceed to payment
        await this.reservationPage.dialogBox.fn_clickFooterBtn('Proceed to Payment');

        // 17. Input Cardholder name, credit card no., cvv and expiry
        await this.paymentPage.enterCardholderName(reservation1DTO.user.getFullName());
        await this.paymentPage.enterCreditCardNo(reservation1DTO.payment.cardNumber);
        await this.paymentPage.enterCVV(reservation1DTO.payment.cvv);
        await this.paymentPage.enterCCExpiryDate(reservation1DTO.payment.expiryDate);
        
        // 18. Proceed to payment
        await this.paymentPage.clickProceed();
        
        // 19. Close the Confirmed Reservation (Steps 1-19 can be reused from "Admin Reservation"
        // test case)
        await this.paymentPage.dialogBox.fn_closeDialogBox();

        // 20. Logout Admin
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGOUT);

        // 21. Login Customer Account (user the pre-existing user account 1)
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGIN);
        await this.loginPage.enterEmail(reservation2DTO.user.email);
        await this.loginPage.enterPassword(reservation2DTO.user.password);
        await this.loginPage.clickLogin();

        // 22. Verify there is/are existing movie/s in the Movies Tab
        movies = await this.moviesPage.getAllMovieDateMatches();
        await expect(movies.length).toBeGreaterThan(0, 'Verify there is/are existing movie/s in the Movies Tab');

        // 23. Click "Get Ticket" for the same movie schedule created from step 9
        await this.moviesPage.clickGetTicket(reservation2DTO.schedule.movie);

        // 24. Select the branch and cinema (from schedule created on step 9)
        await this.reservationPage.selectBranchByText(branchDTO.name);
        await this.reservationPage.selectCinemaByText(branchDTO.cinema[0]);

        // 25. Choose date and time (from schedule created on step 9)
        await this.reservationPage.selectDateByText(reservation2DTO.schedule.getDate());
        await this.reservationPage.selectTimeByText(reservation2DTO.schedule.getTime());

        // 26. Reserve 9 available seats and confirm reservation
        reservation2DTO.seats = await this.reservationPage.selectRandomSeats(9);
        await this.reservationPage.clickConfirmReservationBtn();

        // 27. Verify the ff details from reservation should be displayed
        ticketDetails = await this.reservationPage.dialogBox.fn_getTicketSummaryDetails();
            // a. Ticket Summary dialog box with Ticket Summary text is displayed
            await expect(await this.reservationPage.dialogBox.fn_getTitle()).toBe('Ticket Summary', 'Verify text "Ticket Summary" is displaed in the dialog box.');
            await VerifyTicketSummaryDetails(ticketDetails,reservation2DTO); 

        // 28. Proceed to payment
        await this.reservationPage.dialogBox.fn_clickFooterBtn('Proceed to Payment');

        //29. Verify payment summary details are correct base from the previous inputs (description
        // and total amount)
        paymentDetails = await this.paymentPage.getPaymentSummaryDetails();
            await VerifyPaymentSummaryDetails(paymentDetails, reservation2DTO);

        // 30. Input Cardholder name, credit card no., cvv and expiry
        await this.paymentPage.enterCardholderName(reservation2DTO.user.getFullName());
        await this.paymentPage.enterCreditCardNo(reservation2DTO.payment.cardNumber);
        await this.paymentPage.enterCVV(reservation2DTO.payment.cvv);
        await this.paymentPage.enterCCExpiryDate(reservation2DTO.payment.expiryDate);

        // 31. Proceed to payment
        await this.paymentPage.clickProceed();

        // 32. Verify the ff details from reservation should be displayed
        confirmPaymentDetails = await this.paymentPage.dialogBox.fn_getConfirmedReservationDetails();

            // a. Confirmed Reservation dialog box with text "Your receipt has been sent to your
            // email."
            await expect(await this.paymentPage.dialogBox.fn_getConfirmationMsg()).toBe('Your receipt has been sent to your email.', 'Verify "Your receipt has been sent to your email." text is presemt in the dialog box.');
            await VerifyConfirmPaymentDetails(confirmPaymentDetails, reservation2DTO);
        
        // 33. Close the Confirmed Reservation
        await this.paymentPage.dialogBox.fn_closeDialogBox();

        // 34. Verify the customer should navigated to Movies tab
        await expect(await this.homePage.getActiveNavBar()).toBe('Movies', 'Verify the customer should navigated to Movies tab.');
        await this.homePage.clickNavBar(Enums.NavBarLinks.MOVIES);


        // 35. Click "Get Ticket" for the movie schedule created from step 9
        await this.moviesPage.clickGetTicket(reservation2DTO.schedule.movie);

        // 36. Select the same branch, cinema, date, and time from the previous steps
        await this.reservationPage.selectBranchByText(branchDTO.name);
        await this.reservationPage.selectCinemaByText(branchDTO.cinema[0]);
        await this.reservationPage.selectDateByText(reservation2DTO.schedule.getDate());
        await this.reservationPage.selectTimeByText(reservation2DTO.schedule.getTime());
        
        // 37. Verify the 9 and 10 seats selected from steps 26 and 15 are already reserved
        let takenSeats = await this.reservationPage.getTakenSeats();

        let reservedSeats = [].concat(reservation1DTO.seats, reservation2DTO.seats);

        await expect(takenSeats).toEqual(jasmine.arrayContaining(reservedSeats), `Verify there seats reserved are marked as taken: ${reservedSeats}`);
    });

    it('X. Admin and Two Customers Reservation', async() => {
        const adminDTO = new UserDTO(true,{email:'admin@admin.com',password:'password'}); //existing admin
        const branchDTO = new BranchDTO(false,null);
        const scheduleDTO = new ScheduleDTO(DataProvider.MakeMovies(), 400, DateTimeHelper.GetDate(3) + ' 19:05');
        const paymentDTO = new PaymentDTO(null,'4111111111111111', '123', '1223');

        const reservation1DTO = {
            user: adminDTO,
            branch: branchDTO,
            payment: paymentDTO,
            schedule: scheduleDTO,
            seats: []
        }

        const reservation2DTO = {
            user: new UserDTO(true, {email:'user@user.com'}),
            branch: branchDTO,
            payment: paymentDTO,
            schedule: scheduleDTO,
            seats: []
        }

        const reservation3DTO = {
            user: new UserDTO(true, {email:'user2@user.com'}),
            branch: branchDTO,
            payment: paymentDTO,
            schedule: scheduleDTO,
            seats: []
        }

        await this.homePage.open('/');

        // 1. Login Admin Account
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGIN);
        await this.loginPage.enterEmail(adminDTO.email);
        await this.loginPage.enterPassword(adminDTO.password);
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
        if(cinemaCount < 1)
            await this.adminPage.addCinema(DataProvider.MakeCinema());

        // 6. Click an existing cinema. Input 5 on rows, 20 on columns, and click Update
        let cinemaObj = await this.adminPage.section_editBranch.fn_openCinemaByIndex(Enums.Options.RANDOM);
        await branchDTO.addCinema(cinemaObj.text);

        await this.adminPage.createSeatMap(5,20);
        await this.adminPage.section_editCinema.fn_clickUpdate();

        // 7. Click View Schedules button
        await this.adminPage.section_editBranch.fn_clickViewSchedule();

        // 8. Click Add Movie Schedule
        await this.adminPage.section_viewSchedules.fn_clickAddMovieSchedule();

        // 9. Populate following fields (check step 11 for some details)
        // a. Cinema
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

        // 13. Select the branch and cinema (from schedule created on step 9)
        await this.reservationPage.selectBranchByText(branchDTO.name);
        await this.reservationPage.selectCinemaByText(branchDTO.cinema[0]);

        // 14. Choose date and time (from schedule created on step 9)
        await this.reservationPage.selectDateByText(reservation1DTO.schedule.getDate());
        await this.reservationPage.selectTimeByText(reservation1DTO.schedule.getTime());

        // 15. Reserve 10 seats and confirm reservation
        reservation1DTO.seats = await this.reservationPage.selectRandomSeats(10);
        await this.reservationPage.clickConfirmReservationBtn();

        // 16. Proceed to payment
        reservation1DTO.transactionDate = await this.reservationPage.dialogBox.fn_clickFooterBtn('Proceed to Payment');

        // 17. Input Cardholder name, credit card no., cvv and expiry
        await this.paymentPage.enterCardholderName(reservation1DTO.user.getFullName());
        await this.paymentPage.enterCreditCardNo(reservation1DTO.payment.cardNumber);
        await this.paymentPage.enterCVV(reservation1DTO.payment.cvv);
        await this.paymentPage.enterCCExpiryDate(reservation1DTO.payment.expiryDate);
        
        // 18. Proceed to payment
        await this.paymentPage.clickProceed();
        
        // 19. Close the Confirmed Reservation (Steps 1-19 can be reused from "Admin Reservation"
        // test case)
        await this.paymentPage.dialogBox.fn_closeDialogBox();

        // 20. Logout Admin
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGOUT);

        // 21. Login Customer Account (user the pre-existing user account 1)
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGIN);
        await this.loginPage.enterEmail(reservation2DTO.user.email);
        await this.loginPage.enterPassword(reservation2DTO.user.password);
        await this.loginPage.clickLogin();

        // 22. Click "Get Ticket" for the same movie schedule created from step 9
        await this.moviesPage.clickGetTicket(reservation2DTO.schedule.movie);

        // 23. Select the branch and cinema (from schedule created on step 9)
        await this.reservationPage.selectBranchByText(branchDTO.name);
        await this.reservationPage.selectCinemaByText(branchDTO.cinema[0]);

        // 24. Choose date and time (from schedule created on step 9)
        await this.reservationPage.selectDateByText(reservation2DTO.schedule.getDate());
        await this.reservationPage.selectTimeByText(reservation2DTO.schedule.getTime());

        // 25. Reserve 9 available seats and confirm reservation
        reservation2DTO.seats = await this.reservationPage.selectRandomSeats(9);
        await this.reservationPage.clickConfirmReservationBtn();

        // 26. Click Proceed to payment
        reservation2DTO.transactionDate = await this.reservationPage.dialogBox.fn_clickFooterBtn('Proceed to Payment');

        // 27. Input Cardholder name, credit card no., cvv and expiry
        await this.paymentPage.enterCardholderName(reservation2DTO.user.getFullName());
        await this.paymentPage.enterCreditCardNo(reservation2DTO.payment.cardNumber);
        await this.paymentPage.enterCVV(reservation2DTO.payment.cvv);
        await this.paymentPage.enterCCExpiryDate(reservation2DTO.payment.expiryDate);

        // 28. Proceed to payment
        await this.paymentPage.clickProceed();

        // 29. Close the Confirmed Reservation (Steps 1-29 can be reused from "Admin and 1
        // Customer Reservation" test case)
        await this.paymentPage.dialogBox.fn_closeDialogBox();

        // 30. Logout user 1
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGOUT);

        // 31. Login Customer Account 2 (pre-existing supplied user account 2)
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGIN);
        await this.loginPage.enterEmail(reservation3DTO.user.email);
        await this.loginPage.enterPassword(reservation3DTO.user.password);
        await this.loginPage.clickLogin();

        // 32. Verify that there is/are existing movie/s displayed
        movies = await this.moviesPage.getAllMovieDateMatches();
        await expect(movies.length).toBeGreaterThan(0,`Verify that there is/are existing movie/s displayed. No. of movies displayed: ${movies.length}`);

        // 33. Click "Get Ticket" for the movie schedule created from step 9
        await this.moviesPage.clickGetTicket(reservation3DTO.schedule.movie);

        // 34. Select the branch and cinema (from schedule created on step 9)
        await this.reservationPage.selectBranchByText(branchDTO.name);
        await this.reservationPage.selectCinemaByText(branchDTO.cinema[0]);

        // 35. Choose date and time (from schedule created on step 9)
        await this.reservationPage.selectDateByText(reservation3DTO.schedule.getDate(0));
        await this.reservationPage.selectTimeByText(reservation3DTO.schedule.getTime(0).toLowerCase());

        // 36. Reserve 8 seats and confirm reservation
        reservation3DTO.seats = await this.reservationPage.selectRandomSeats(8);
        await this.reservationPage.clickConfirmReservationBtn();

        // 37. Click Proceed to payment
        reservation3DTO.transactionDate = await this.reservationPage.dialogBox.fn_clickFooterBtn('Proceed to Payment');

        // 38. Verify payment summary details are correct base from the previous inputs (description
        // and total amount)
        let paymentDetails = await this.paymentPage.getPaymentSummaryDetails();
        await VerifyPaymentSummaryDetails(paymentDetails,reservation3DTO);

        // 39. Input Cardholder name, credit card no., cvv and expiry
        await this.paymentPage.enterCardholderName(reservation3DTO.user.getFullName());
        await this.paymentPage.enterCreditCardNo(reservation3DTO.payment.cardNumber);
        await this.paymentPage.enterCVV(reservation3DTO.payment.cvv);
        await this.paymentPage.enterCCExpiryDate(reservation3DTO.payment.expiryDate);

        // 40. Proceed to payment
        await this.paymentPage.clickProceed();

        // 41. Verify the ff details from reservation should be displayed
        let confirmPaymentDetails = await this.paymentPage.dialogBox.fn_getConfirmedReservationDetails();
            // a. Confirmed Reservation dialog box with text "Your receipt has been sent to your
            // email."
            await expect(await this.paymentPage.dialogBox.fn_getConfirmationMsg()).toBe('Your receipt has been sent to your email.', 'Verify Confirmed Reservation dialog box has text "Your receipt has been sent to your email".');

            await VerifyConfirmPaymentDetails(confirmPaymentDetails, reservation3DTO);

        // 42. Close the Confirmed Reservation
        await this.paymentPage.dialogBox.fn_closeDialogBox();

        // 43. Verify the customer should navigated to Movies tab
        await expect(await this.homePage.getActiveNavBar()).toBe('Movies', 'Verify the customer should navigated to Movies tab');
        await this.homePage.clickNavBar(Enums.NavBarLinks.MOVIES);

        // 44. Click "Get Ticket" for the movie schedule created from step 8
        await this.moviesPage.clickGetTicket(reservation3DTO.schedule.movie);

        // 45. Select the same branch, cinema, date, and time from the previous steps46. Verify the 10 admin reserved seats, 9 user 1 reserved seats, and 8 user 2 reserved seats
        // are already reserved from the grid
        await this.reservationPage.selectBranchByText(branchDTO.name);
        await this.reservationPage.selectCinemaByText(branchDTO.cinema[0]);
        await this.reservationPage.selectDateByText(reservation3DTO.schedule.getDate(0));
        await this.reservationPage.selectTimeByText(reservation3DTO.schedule.getTime(0).toLowerCase());

        // 47. Logout User Account 2
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGOUT);

        // 48. Login Admin account
        await this.homePage.clickNavBar(Enums.NavBarLinks.LOGIN);
        await this.loginPage.enterEmail(adminDTO.email);
        await this.loginPage.enterPassword(adminDTO.password);
        await this.loginPage.clickLogin();

        // 49. Click Admin tab
        await this.homePage.clickNavBar(Enums.NavBarLinks.ADMIN);

        // 50. Select the Payment in dropdown menu
        await this.adminPage.selectModuleByText(Enums.Modules.PAYMENT);

        // // 51. Click the date and time link of the date from the reservations above (use filter date or
        // // pagination buttons if many schedules are displayed)
        // //filter to transaction date
        // // // 52. Verify the reservation details displayed are correct based from previous inputs (user,
        // // // description, cardholder name and amount) should be displayed.

        //get all payment transactions info under transaction date specified

        let paymentTransactionsDetails = await this.adminPage.getPaymentTransactionsDetails(DateTimeHelper.FormatDate(new Date(), 'yyyy-mm-dd'));

        let allReservations = [].concat(reservation1DTO, reservation2DTO, reservation3DTO);

        for await(const dto of allReservations){
            await expect(paymentTransactionsDetails).toContain({
                list: {
                    description: {
                        movie: dto.schedule.movie,
                        branch: dto.branch.name,
                        cinema: dto.branch.cinema[0],
                        date: dto.schedule.datetime,
                        seats: dto.seats
                    },
                    totalPrice: Number.parseFloat(dto.seats.length * dto.schedule.price)
                },
                detail: {
                    user: {
                        email: dto.user.email,
                        fullname: dto.user.getFullName()
                    },
                    description: {
                        movie: dto.schedule.movie,
                        branch: dto.branch.name,
                        cinema: dto.branch.cinema[0],
                        date: dto.schedule.datetime,
                        seats: dto.seats
                    },
                    totalPrice: Number.parseFloat(dto.seats.length * dto.schedule.price)
                }
            }, `Verify this payment transaction is in the admin payment transactions list: = ${JSON.stringify(dto)}`);
        }

    });

    VerifyConfirmPaymentDetails = async(actualData, dto) => {
            
            // b. Branch name
            await expect(actualData.branch).toBe(dto.branch.name, `[Confirm Payment] \tVerify branch name is ${dto.branch.name} in the confirm payment details page.`);
            
            // c. Cinema name
            await expect(actualData.cinema).toBe(dto.branch.cinema[0], `[Confirm Payment] \tVerify cinema is ${dto.branch.cinema[0]} in the confirm payment details page.`);
            
            // d. Movie name
            await expect(actualData.movie).toBe(dto.schedule.movie, `[Confirm Payment] \tVerify movie is ${dto.schedule.movie} in the confirm payment details page.`);
            
            // e. Date
            // f. Time
            await expect(actualData.datetime).toEqual(dto.schedule.datetime, `[Confirm Payment] \tVerify schedule date is ${dto.schedule.datetime} in the confirm payment details page.`);

            // g. Price
            await expect(actualData.price).toBe(dto.schedule.price, `[Confirm Payment] \tVerify price is ${dto.schedule.price} in the confirm payment details page.`);

            // h. Seats selected
            await expect(actualData.seats).toEqual(dto.seats, `[Confirm Payment] \tVerify seat/s is/are ${dto.seats} in the confirm payment details page.`);
            
            // i. # of seats
            await expect(actualData.numSeats).toEqual(dto.seats.length, `[Confirm Payment] \tVerify there are ${dto.seats} seats in the confirm payment details page.`);

            // j. Total
            await expect(actualData.total).toEqual(Number.parseFloat(dto.schedule.price * dto.seats.length), 
                `[Confirm Payment] \tVerify total price is ${Number.parseFloat(dto.schedule.price * dto.seats.length)} in the confirm payment details page.`);
    }

    VerifyTicketSummaryDetails = async(actualData, dto) => {
            // b. Branch name
            await expect(actualData.branch).toBe(dto.branch.name, `[Ticket Summary] \tVerify branch is ${dto.branch.name} in the ticket details.`);
            
            // c. Cinema name
            await expect(actualData.cinema).toBe(dto.branch.cinema[0], `[Ticket Summary] \tVerify cinema is ${dto.branch.cinema[0]} in the ticket details.`);
            
            // d. Movie name
            await expect(actualData.movie).toBe(dto.schedule.movie, `[Ticket Summary] \tVerify movie is ${dto.schedule.movie} in the ticket details.`);
            
            // e. Date
            // f. Time
            await expect(actualData.datetime).toEqual(dto.schedule.datetime, `[Ticket Summary] \tVerify schedule date is ${dto.schedule.datetime} in the ticket details.`);

            // g. Price
            await expect(actualData.price).toBe(dto.schedule.price, `[Ticket Summary] \tVerify price is ${dto.schedule.price} in the ticket details.`);

            // h. Seats selected
            await expect(actualData.seats).toEqual(dto.seats, `[Ticket Summary] \tVerify seats are ${dto.seats} in the ticket details.`);
    }

    VerifyPaymentSummaryDetails = async(actualData, dto) => {
        // Branch name
        await expect(actualData.description[1]).toBe(dto.branch.name, `[Payment Summary] \tVerify branch is ${dto.branch.name} in the payment summary.`);
            
        // Cinema name
        await expect(actualData.description[2]).toBe(dto.branch.cinema[0], `[Payment Summary] \tVerify cinema is ${dto.branch.cinema[0]} in the payment summary.`);
        
        // Movie name
        await expect(actualData.description[0]).toBe(dto.schedule.movie, `[Payment Summary] \tVerify movie is ${dto.schedule.movie} in the payment summary.`);
        
        // Date
        // Time
        await expect(new Date(actualData.description[3])).toEqual(dto.schedule.datetime, `[Payment Summary] \tVerify schedule date is ${dto.schedule.datetime} in the payment summary.`);

        // Price
        await expect(Number.parseFloat(actualData.total.replace(/,/g, ''))).toBe(Number.parseFloat(dto.schedule.price * dto.seats.length),
        `[Payment Summary] \tVerify that total price is ${Number.parseFloat(dto.schedule.price * dto.seats.length)} in the payment summary.`);

        // Seats selected
        await expect(actualData.description[4].split(', ')).toEqual(dto.seats, `[Payment Summary] \tVerify seats are ${dto.schedule.datetime} in the payment summary.`);
    }

});