import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainNavigationComponent } from './default/main-navigation/main-navigation.component';
import { FooterComponent } from './default/footer/footer.component';
import { DefaultThemeComponent } from './default/default-theme.component';

@NgModule({
  declarations: [MainNavigationComponent, FooterComponent, DefaultThemeComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DefaultThemeComponent
  ]
})
export class ThemeModule { }
