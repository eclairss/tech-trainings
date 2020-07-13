import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  modules: string[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.modules = ['', 'Movie', 'Branch', 'Payment'];
  }

  onModuleChanged(event: any): void {
    const value = event.target.value.toLowerCase();
    this.router.navigate([`admin/${value}`]);
  }
}
