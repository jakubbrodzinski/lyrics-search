import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {MatSlider} from "@angular/material/slider";

@Component({
  selector: 'app-date-facet',
  templateUrl: './date-facet.component.html',
  styleUrls: ['./date-facet.component.scss']
})
export class DateFacetComponent implements OnChanges {
  @Input()
  minDate: string; //yyyy-MM-dd
  @Input()
  maxDate: string; // yyyy-MM-dd
  @Input()
  inverted: boolean;
  @Output()
  dateChange = new EventEmitter<string>();

  disabled: boolean = true;
  minYear: number;
  minMonth: number;
  maxYear: number;
  maxMonth: number;
  minAsNumber: number = 0;
  maxAsNumber: number = 0;

  formatFunction: (number) => string = (_) => '00-0000';

  @ViewChild('matSlider') matSlider: MatSlider;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.minDate && this.maxDate) {
      this.minYear = Number(this.minDate.substr(0, 4))
      this.minMonth = Number(this.minDate.substr(5, 2))
      this.maxYear = Number(this.maxDate.substr(0, 4))
      this.maxMonth = Number(this.maxDate.substr(5, 2))
      this.calculateMaxAsNumber();
    } else {
      this.disabled = true;
      this.dateChange.emit(null);
      this.formatFunction = (_) => '00-0000';
    }
  }

  private calculateMaxAsNumber() {
    let diff = 0;
    if (this.minYear === this.maxYear) {
      this.maxAsNumber = this.maxMonth - this.minMonth;
      return
    }
    if (this.minMonth < this.maxMonth) {
      diff += this.maxMonth - this.minMonth;
      diff += 12 * (this.maxYear - this.minYear);
    } else {
      diff += 12 - this.minMonth + this.maxMonth;
      diff += 12 * (this.maxYear - this.minYear - 1);
    }
    this.maxAsNumber = diff;
    this.reassignFormatFunction()
  }

  private reassignFormatFunction() {
    this.formatFunction = (selected) => {
      let year = this.minYear + (selected / 12 | 0);
      let month = this.minMonth + selected % 12;
      if (month > 12) {
        year += 1;
        month -= 12;
      }
      return month.toString() + '-' + year;
    }
  }

  onCheckboxChange($event: MatCheckboxChange) {
    this.disabled = !$event.checked
    if(this.disabled) {
      this.matSlider.value=0;
      this.dateChange.emit(null);
    }
  }

  onDateChange($event: number) {
    if (!this.disabled && $event > 0) {
      this.dateChange.emit(this.formatFunction($event));
    }
  }
}
