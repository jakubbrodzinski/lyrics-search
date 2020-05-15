import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ElasticService} from "../services/elastic.service";
import {FacetEntity} from "../models/facet-entity";
import {AbstractQueryResolver} from "../models/abstract-query-resolver";

@Injectable()
export class AuthorsResolver extends AbstractQueryResolver implements Resolve<FacetEntity[]> {
  constructor(private elasticService: ElasticService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FacetEntity[]> | FacetEntity[] {
    const qParamMap = route.queryParamMap;
    return this.elasticService.getFacetAuthors(super.convertToQuery(qParamMap));
  }

}
