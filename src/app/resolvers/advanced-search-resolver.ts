import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {PagedResults} from "../models/query-result";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ElasticService} from "../services/elastic.service";
import {AbstractQueryResolver} from "../models/abstract-query-resolver";
import {QueryParams} from "../models/query-params";

@Injectable()
export class AdvancedSearchResolver extends AbstractQueryResolver implements Resolve<PagedResults> {
  private DEFAULT_PAGE_SIZE: number = 10;

  constructor(private elasticService: ElasticService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResults> | PagedResults {
    //TODO queryParam is required? if not redirect?
    const qParamMap = route.queryParamMap;
    return this.elasticService.searchForSongs(super.convertToQuery(qParamMap),
      Number(qParamMap.get(QueryParams.PAGE_SIZE) || this.DEFAULT_PAGE_SIZE),
      Number(qParamMap.get(QueryParams.OFFSET) || 0),
      qParamMap.get(QueryParams.SORT_FIELD),
      qParamMap.get(QueryParams.SORT_DIRECTION));
  }

}
