import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BranchService } from 'src/app/@core/services/branch.service';
import { CinemaService } from 'src/app/@core/services/cinema.service';
import { CinemaSeatPlanService } from 'src/app/@core/services/cinema-seat-plan.service';
import { Branch } from 'src/app/@core/models/Branch';
import { Cinema } from 'src/app/@core/models/Cinema';
import { CinemaSeatPlan } from 'src/app/@core/models/CinemaSeatPlan';
import { Seat } from 'src/app/@core/models/Seat';

@Component({
  selector: 'app-cinema-edit',
  templateUrl: './cinema-edit.component.html',
  styleUrls: ['./cinema-edit.component.css']
})
export class CinemaEditComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  subscriptions: Subscription;
  branch: Branch;
  cinema: Cinema;
  cinemaSeatPlan: CinemaSeatPlan;
  forceChangeSeatPlan: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private branchService: BranchService,
    private cinemaService: CinemaService,
    private cinemaSeatPlanService: CinemaSeatPlanService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.getBranch();
    this.getCinema();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getBranch() {
    const id = +this.route.snapshot.params['id'];
    this.subscriptions.add(
      this.branchService.get(id).subscribe(data => {
        this.branch = data;
      })
    );
  }

  getCinema() {
    const cinemaId = +this.route.snapshot.params['cinemaId'];
    this.subscriptions.add(
      this.cinemaService.get(cinemaId).subscribe(data => {
        this.cinema = data;
        this.createForm();
        this.getCinemaSeatPlan();
      })
    );
  }

  getCinemaSeatPlan() {
    this.cinemaSeatPlan = new CinemaSeatPlan();
    this.cinemaSeatPlan.rows = 0;
    this.cinemaSeatPlan.columns = 0;
    this.cinemaSeatPlan.seats = [];

    this.subscriptions.add(
      this.cinemaSeatPlanService.getByCinema(this.cinema.id).subscribe(data => {
        if (data) {
          this.cinemaSeatPlan = data;
        }
      })
    );
  }

  createForm() {
    this.editForm = this.fb.group({
      name: [this.cinema.name, [Validators.required]]
    });
  }

  onSubmit() {
    const value = this.editForm.value;
    this.cinema.name = value.name;
    this.cinemaSeatPlan.cinemaId = this.cinema.id;

    this.subscriptions.add(
      this.cinemaService.update(this.cinema).subscribe(data => {
        if (!this.cinemaSeatPlan.id) {
          this.subscriptions.add(
            this.cinemaSeatPlanService
              .add(this.cinemaSeatPlan)
              .subscribe(data => {
                this.router.navigate(['admin', 'branch', this.cinema.branchId]);
              })
          );
        } else {
          this.subscriptions.add(
            this.cinemaSeatPlanService
              .update(this.cinemaSeatPlan)
              .subscribe(data => {
                this.router.navigate(['admin', 'branch', this.cinema.branchId]);
              })
          );
        }
      })
    );
  }

  cinemaSeatPlanChangeEvent(cinemaSeatPlan: CinemaSeatPlan) {
    this.cinemaSeatPlan = cinemaSeatPlan;
    this.cinemaSeatPlan.seats = [];
    for (let row = 0; row < this.cinemaSeatPlan.rows; row++) {
      for (let col = 0; col < this.cinemaSeatPlan.columns; col++) {
        const seat = new Seat();
        seat.cinemaSeatPlanId = this.cinemaSeatPlan.id;
        seat.row = row;
        seat.col = col;
        seat.disabled = false;
        seat.text = `${this.indexToChar(row)}${col}`;
        this.cinemaSeatPlan.seats.push(seat);
      }
    }
    this.forceChangeSeatPlan++;
  }

  seatClickEvent(seat: Seat) {
    this.cinemaSeatPlan.seats
      .filter(s => s.row === seat.row && s.col === seat.col)
      .forEach(s => {
        s.disabled = !s.disabled;
      });
    this.forceChangeSeatPlan++;
  }

  indexToChar(i) {
    return String.fromCharCode(i + 65); //ASCII: 65 = 'A', 97 = 'a'
  }
}
