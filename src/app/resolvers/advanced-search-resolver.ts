import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {PagedResults} from "../models/query-result";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ElasticService} from "../services/elastic.service";
import {AbstractQueryResolver} from "../models/abstract-query-resolver";

@Injectable()
export class AdvancedSearchResolver extends AbstractQueryResolver implements Resolve<PagedResults> {
  constructor(private elasticService: ElasticService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResults> | PagedResults {
    //TODO queryParam is required? if not redirect?
    const qParamMap = route.queryParamMap;
    return this.elasticService.searchForSongs(super.convertToQuery(qParamMap), Number(qParamMap.get('size') || '20'), null);
  }

}
