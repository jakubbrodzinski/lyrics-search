import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.scss']
})
export class SimpleSearchComponent {
  searchFormGroup: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.searchFormGroup = this.fb.group({
      query: ['', Validators.required]
    })
  }

  searchClick() {
    if (!this.searchFormGroup.valid)
      return

    return this.router.navigate(['/search'], {
      queryParams: {
        query: this.searchFormGroup.get('query').value
      }
    })
  }
}
