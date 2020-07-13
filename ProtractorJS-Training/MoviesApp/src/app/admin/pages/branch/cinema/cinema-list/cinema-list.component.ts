import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CinemaService } from 'src/app/@core/services/cinema.service';
import { Observable, Subscription } from 'rxjs';
import { Branch } from 'src/app/@core/models/Branch';
import { Cinema } from 'src/app/@core/models/Cinema';

@Component({
  selector: 'app-cinema-list',
  templateUrl: './cinema-list.component.html',
  styleUrls: ['./cinema-list.component.css']
})
export class CinemaListComponent implements OnInit, OnDestroy {
  @Input()
  branch: Branch;
  cinemas$: Observable<Cinema[]>;
  subscriptions: Subscription;

  constructor(
    private cinemaService: CinemaService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.getCinemas();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getCinemas() {
    this.cinemas$ = this.cinemaService.getList(this.branch.id);
  }
}
