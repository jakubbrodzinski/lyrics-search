import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.scss']
})
export class SimpleSearchComponent {
  searchFormGroup: FormGroup;
  searchFormControl: FormControl = new FormControl();

  constructor(private router: Router) {
    this.searchFormGroup = new FormGroup({
      searchFormControl: new FormControl()
    });
  }


  getRequiredErrorMessage() {
    return 'Please enter a text';
  }

  search() {
    if (this.searchFormControl.hasError('required')) {
      this.searchFormControl.markAsTouched();
      return;
    }

    this.router.navigate(['/search'], {
      queryParams: {
        query: this.searchFormControl.value
      }
    })
  }
}
