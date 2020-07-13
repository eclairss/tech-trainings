import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from 'src/app/@core/services/branch.service';
import { Branch } from 'src/app/@core/models/Branch';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-branch-add',
  templateUrl: './branch-add.component.html',
  styleUrls: ['./branch-add.component.css']
})
export class BranchAddComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  subscriptions: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private branchService: BranchService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.createForm();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['']
    });
  }

  onSubmit() {
    const value = this.addForm.value;
    const branch = new Branch();
    branch.name = value.name;
    branch.address = value.address;

    this.subscriptions.add(
      this.branchService.add(branch).subscribe(data => {
        this.router.navigate(['admin/branch']);
      })
    );
  }
}
