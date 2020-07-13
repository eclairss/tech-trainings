import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { BranchService } from './services/branch.service';
import { CinemaService } from './services/cinema.service';
import { CinemaSeatPlanService } from './services/cinema-seat-plan.service';
import { OMDbService } from './services/omdb.service';
import { MovieService } from './services/movie.service';
import { ScheduleService } from './services/schedule.service';
import { MapperService } from './services/mapper.service';
import { UserService } from './services/user.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    BranchService,
    CinemaService,
    CinemaSeatPlanService,
    OMDbService,
    MovieService,
    ScheduleService,
    MapperService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AdminGuard,
    AuthGuard
  ]
})
export class CoreModule { }
