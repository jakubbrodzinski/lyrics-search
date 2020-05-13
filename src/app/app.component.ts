import {Component} from '@angular/core';
import {ElasticService} from "./services/elastic.service";
import {FacetEntity} from "./models/facet-entity";
import {Observable} from "rxjs";
import {FacetType} from "./models/facet-type";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
