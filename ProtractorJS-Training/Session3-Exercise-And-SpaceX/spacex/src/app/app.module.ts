import { ConfirmationModalComponent } from './global/confirmation-modal/confirmation-modal.component';
import { LaunchPlanService } from 'src/app/services/launch-plan.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpaceXService } from './services/api/space-x.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { LauncherModule } from './launcher/launcher.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DecimalOnlyDirective } from './global/directives/decimal-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardModule,
    UserModule,
    LauncherModule,
    FormsModule,
    CommonModule,
    LoginModule,
    NgbModule
  ],
  providers: [
    SpaceXService,
    LaunchPlanService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
