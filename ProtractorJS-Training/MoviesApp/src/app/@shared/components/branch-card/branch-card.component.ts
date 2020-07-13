import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Branch } from 'src/app/@core/models/Branch';

@Component({
  selector: 'app-branch-card',
  templateUrl: './branch-card.component.html',
  styleUrls: ['./branch-card.component.css']
})
export class BranchCardComponent implements OnInit {
  @Input()
  branch: Branch;
  @Input()
  link: string;
  @Output()
  checkSchedulesClickEvent = new EventEmitter<Branch>();

  constructor() { }

  ngOnInit() {
  }

  onClickCheckSchedules() {
    this.checkSchedulesClickEvent.emit(this.branch);
  }
}
