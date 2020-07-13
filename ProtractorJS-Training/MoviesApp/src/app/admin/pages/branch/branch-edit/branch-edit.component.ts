import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BranchService } from 'src/app/@core/services/branch.service';
import { Branch } from 'src/app/@core/models/Branch';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {
  branch: Branch;
  editForm: FormGroup;
  subscriptions: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private branchService: BranchService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      this.branchService.get(id).subscribe(data => {
        this.branch = data;
        this.createForm();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createForm() {
    this.editForm = this.fb.group({
      name: [this.branch.name, [Validators.required]],
      address: [this.branch.address, []]
    });
  }

  onSubmit() {
    const value = this.editForm.value;
    this.branch.name = value.name;
    this.branch.address = value.address;

    this.subscriptions.add(
      this.branchService.update(this.branch).subscribe(data => {})
    );
  }

  onClickAddCinema() {
    this.router.navigate(['admin', 'branch', this.branch.id, 'cinema', 'add']);
  }

  onClickViewSchedules() {
    this.router.navigate(['admin', 'branch', this.branch.id, 'schedule']);
  }
}
