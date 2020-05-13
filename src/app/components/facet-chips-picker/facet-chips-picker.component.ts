import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FacetEntity} from "../../models/facet-entity";
import {FormControl} from "@angular/forms";
import {combineLatest, Observable, Subject} from "rxjs";
import {debounceTime, map, startWith} from "rxjs/operators";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-facet-chips-picker',
  templateUrl: './facet-chips-picker.component.html',
  styleUrls: ['./facet-chips-picker.component.scss']
})
export class FacetChipsPickerComponent implements OnChanges {
  pickedChips: FacetEntity[];
  @Input()
  allAvailable: FacetEntity[];
  @Input()
  pickedOnStart: string[];
  @Output()
  onChipsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  private refreshAutoComplete$ = new Subject<boolean>();

  filterControl: FormControl = new FormControl();
  filteredNotPickedFacets$: Observable<FacetEntity[]>;
  @ViewChild('facetInput') filterInput: ElementRef<HTMLInputElement>;

  constructor() {
    const temp$ = this.filterControl.valueChanges.pipe(
      startWith(<string>null),
      debounceTime(500)
    );
    this.filteredNotPickedFacets$ = combineLatest([temp$, this.refreshAutoComplete$.asObservable()]).pipe(
      map(arr => arr[0]),
      map<string, FacetEntity[]>((filter: string | null) => {
        console.log('filter by: ' + filter)
        return filter ? this._filter(filter) : this.allAvailable
      })
    );
  }

  private _filter(value: string): FacetEntity[] {
    const filterValue = value.toLowerCase();
    return this.allAvailable.filter(facet => facet.key.toLowerCase().includes(filterValue));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pickedOnStart.currentValue && changes.pickedOnStart.currentValue.length && changes.allAvailable.currentValue) {
      this.refreshAutoComplete$.next(true);
      let pickedOnStart = [];
      let available = [];
      this.allAvailable.forEach(facet => {
        if (this.pickedOnStart.includes(facet.key))
          pickedOnStart.push(facet);
        else
          available.push(facet);
      })
      this.pickedChips = pickedOnStart;
      this.allAvailable = available;
    }
  }

  removeChip(removed: FacetEntity) {
    this.pickedChips = this.pickedChips
      .filter(picked => picked.key !== removed.key);
    this.allAvailable.push(removed);
    this.emitCurrentValues();
  }

  onSelectedNewChip(selected: MatAutocompleteSelectedEvent) {
    const pickedFacet: string = selected.option.value;
    const temp = [];
    this.allAvailable.forEach(f => {
      if (f.key !== pickedFacet)
        temp.push(f);
      else
        this.pickedChips.push(f);
    });
    this.allAvailable = temp;
    this.filterInput.nativeElement.value = '';
    this.filterControl.setValue(null);
    this.emitCurrentValues();
  }

  private emitCurrentValues() {
    this.onChipsChange.emit(
      this.pickedChips.map(f => f.key)
    )
  }

}
