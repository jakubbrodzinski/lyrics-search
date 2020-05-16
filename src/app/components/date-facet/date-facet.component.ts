import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
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
  startValue: string //yyyy-MM
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

  sliderValue: number = 0;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.minDate && this.maxDate) {
      this.minYear = Number(this.minDate.substr(0, 4))
      this.minMonth = Number(this.minDate.substr(5, 2))
      this.maxYear = Number(this.maxDate.substr(0, 4))
      this.maxMonth = Number(this.maxDate.substr(5, 2))
      this.calculateMaxAsNumber();
      if (this.startValue)
        this.loadStartValue();
    } else {
      this.disabled = true;
      this.dateChange.emit(null);
      this.formatFunction = (_) => '0000-00';
    }
  }

  private loadStartValue() {
    this.disabled = false;
    let year = Number(this.startValue.substr(0, 4))
    let month = Number(this.startValue.substr(5, 2))
    let diff = this.getDiff(this.minYear, this.minMonth, year, month);
    this.sliderValue = diff;
  }

  private calculateMaxAsNumber() {
    this.maxAsNumber = this.getDiff(this.minYear, this.minMonth, this.maxYear, this.maxMonth);
    this.reassignFormatFunction()
  }

  private getDiff(beforeYear, beforeMonth, afterYear, afterMonth) {
    if (beforeYear === afterYear) {
      return afterMonth - beforeMonth;
    }
    let diff = 0;
    if (beforeMonth < afterMonth) {
      diff += afterMonth - beforeMonth
      diff += 12 * (afterYear - beforeYear);
    } else {
      diff += 12 - beforeMonth + afterMonth
      diff += 12 * (afterYear - beforeYear - 1);
    }
    return diff;
  }

  private reassignFormatFunction() {
    this.formatFunction = (selected) => {
      let year = this.minYear + (selected / 12 | 0);
      let month = this.minMonth + selected % 12;
      if (month > 12) {
        year += 1;
        month -= 12;
      }
      return year + (month < 10 ? '-0' : '-') + month;
    }
  }

  onCheckboxChange($event: MatCheckboxChange) {
    this.disabled = !$event.checked
    if (this.disabled) {
      this.sliderValue = 0;
      this.dateChange.emit(null);
    }
  }

  onDateChange($event: number) {
    if (!this.disabled && $event > 0) {
      this.dateChange.emit(this.formatFunction($event));
    }
  }
}
