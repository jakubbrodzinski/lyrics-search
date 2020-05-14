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
  pickedChips: FacetEntity[] = [];
  availableChips: FacetEntity[] = [];
  @Input()
  allAvailable: FacetEntity[];
  @Input()
  pickedOnStart: string[];
  @Output()
  onChipsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  private refreshAutoComplete$ = new Subject<void>();

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
        return filter ? this._filter(filter) : this.availableChips
      })
    );
  }

  private _filter(value: string): FacetEntity[] {
    const filterValue = value.toLowerCase();
    return this.availableChips.filter(facet => facet.key.toLowerCase().includes(filterValue));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.allAvailable && this.pickedOnStart && this.pickedOnStart.length) {
      let picked = [];
      let available = [];
      this.allAvailable.forEach(facet => {
        if (this.pickedOnStart.includes(facet.key))
          picked.push(facet);
        else
          available.push(facet);
      })
      this.pickedChips = picked;
      this.availableChips = available;
    }else if(this.allAvailable){
      this.availableChips = this.allAvailable.slice();
    }

    if (changes.pickedOnStart || changes.allAvailable) {
      this.refreshAutoComplete$.next();
    }
  }

  removeChip(removed: FacetEntity) {
    this.pickedChips = this.pickedChips
      .filter(picked => picked.key !== removed.key);
    this.availableChips.push(removed);
    this.emitCurrentValues();
  }

  onSelectedNewChip(selected: MatAutocompleteSelectedEvent) {
    const pickedFacet: string = selected.option.value;
    const temp = [];
    this.availableChips.forEach(f => {
      if (f.key !== pickedFacet)
        temp.push(f);
      else
        this.pickedChips.push(f);
    });
    this.availableChips = temp;
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
