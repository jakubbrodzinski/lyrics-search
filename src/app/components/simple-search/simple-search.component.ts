import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.scss']
})
export class SimpleSearchComponent {
  searchFormControl: FormControl = new FormControl();

  constructor(private router: Router) {
  }

  searchClick() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.searchFormControl.value
      }
    })
  }
}
