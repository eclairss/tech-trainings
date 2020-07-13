import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import {
  filter,
  map,
  tap,
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { BranchService } from 'src/app/@core/services/branch.service';
import { Branch } from 'src/app/@core/models/Branch';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit, OnDestroy {
  searchItem: Branch;
  branches: Branch[];
  searching: boolean;
  searchFailed: boolean;
  subscriptions: Subscription;
  itemsPerPage: number;
  page: number;
  totalCount: number;

  constructor(private router: Router, private branchService: BranchService) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.branches = [];
    this.searchItem = new Branch();
    this.searchItem.name = '';
    this.itemsPerPage = 6;
    this.page = 1;
    this.getPagedBranches();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onClickAdd() {
    this.router.navigate(['admin', 'branch', 'add']);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term =>
        term.length < 2
          ? of([])
          : this.branchService.getPagedList(term).pipe(
              map(res => {
                this.searchFailed = !res.list || !res.list.length;
                return res.list;
              }),
              catchError(() => {
                this.searchFailed = true;
                return of([]);
              })
            )
      ),
      tap(() => (this.searching = false))
    );

  onSelectItem = (e: any) => {
    this.searchItem = e.item;
    this.router.navigate(['admin/branch', this.searchItem.id]);
  };

  onCheckSchedulesClick(branch: Branch) {
    this.router.navigate(['admin', 'branch', branch.id, 'schedule']);
  }

  getPagedBranches() {
    const start = this.itemsPerPage * this.page - this.itemsPerPage;
    const end = this.itemsPerPage * this.page;
    this.subscriptions.add(
      this.branchService.getPagedList('', start, end).subscribe(data => {
        this.branches = data.list;
        this.totalCount = data.totalCount;
      })
    )
  }

  onItemsPerPageChanged(event: any) {
    this.getPagedBranches();
  }

  onChangePage(page) {
    this.page = page;
    this.getPagedBranches();
  }
}
