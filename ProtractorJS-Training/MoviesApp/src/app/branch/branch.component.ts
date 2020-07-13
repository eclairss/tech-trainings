import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Branch } from '../@core/models/Branch';
import { Router } from '@angular/router';
import { BranchService } from '../@core/services/branch.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  branches$: Observable<Branch[]>;
  subscriptions: Subscription;

  constructor(private router: Router, private branchService: BranchService) { }

  ngOnInit() {
    this.getBranches();
  }

  onSelectItem = (branch: Branch) => {
    this.router.navigate(['branches', branch.id]);
  };

  onCheckSchedulesClick(branch: Branch) {
    this.router.navigate(['movies', 'branch', branch.id]);
  }

  getBranches() {
    this.branches$ = this.branchService.getAll();
  }
}
