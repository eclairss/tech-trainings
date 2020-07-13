import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BranchService } from 'src/app/@core/services/branch.service';
import { CinemaService } from 'src/app/@core/services/cinema.service';
import { Branch } from 'src/app/@core/models/Branch';
import { Cinema } from 'src/app/@core/models/Cinema';

@Component({
  selector: 'app-cinema-add',
  templateUrl: './cinema-add.component.html',
  styleUrls: ['./cinema-add.component.css']
})
export class CinemaAddComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  subscriptions: Subscription;
  branch: Branch;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private branchService: BranchService,
    private cinemaService: CinemaService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.getBranch();
    this.createForm();
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

  createForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const value = this.addForm.value;
    const cinema = new Cinema();
    cinema.name = value.name;
    cinema.branchId = this.branch.id;

    this.subscriptions.add(
      this.cinemaService.add(cinema).subscribe(data => {
        this.router.navigate(['admin', 'branch', cinema.branchId]);
      })
    );
  }
}
