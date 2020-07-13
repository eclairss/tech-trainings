import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

@Directive({
  selector: '[kickoff]'
})
export class KickoffHighlightDirective implements OnInit {

  @Input() kickoff: string;

  _pastDue = "#C7D2D7";
  _current = "#C20404";
  _nextDue = "#30BAD6";
  _futureDue = "#1e335f";

  constructor(private elementRef: ElementRef, private render: Renderer2) {

  }

  ngOnInit(): void {
    let color = "none",
      dateToday = new Date(Date.now()),
      launchDate = new Date(this.kickoff);

    let currentDueDate = this.addDays(dateToday, 5),
      nextDueDate = this.addDays(currentDueDate, 5);


    if (launchDate < dateToday) { color = this._pastDue; }
    else {
      if (launchDate <= currentDueDate) { color = this._current; }
      else {
        if (launchDate > nextDueDate) { color = this._futureDue; }
        else { color = this._nextDue; }
      }
    }
    
    this.render.setStyle(
      this.elementRef.nativeElement,
      'border', `5px solid ` + color);
  }


  addDays(date: Date, addDays: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + addDays, 23, 59, 59);
  }

}
