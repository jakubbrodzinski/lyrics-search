import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ElasticService} from "../services/elastic.service";
import {DateFacet} from "../models/facet-entity";

@Injectable()
export class DateResolver implements Resolve<DateFacet> {
  constructor(private elasticService: ElasticService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DateFacet> | DateFacet {
    return this.elasticService.getFacetDates();
  }

}
