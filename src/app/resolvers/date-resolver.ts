import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ElasticService} from "../services/elastic.service";
import {DateFacet} from "../models/facet-entity";
import {AbstractQueryResolver} from "../models/abstract-query-resolver";

@Injectable()
export class DateResolver extends AbstractQueryResolver implements Resolve<DateFacet> {
  constructor(private elasticService: ElasticService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DateFacet> | DateFacet {
    const qParamMap = route.queryParamMap;
    return this.elasticService.getFacetDates(super.convertToQuery(qParamMap));
  }

}
