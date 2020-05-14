import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {QueryResult} from "../models/query-result";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ElasticService} from "../services/elastic.service";
import {Query} from "../models/query";
import {QueryParams} from "../models/query-params";

@Injectable()
export class AdvancedSearchResolver implements Resolve<QueryResult[]> {
  constructor(private elasticService: ElasticService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QueryResult[]> | QueryResult[] {
    //TODO queryParam is required? if not redirect?
    const qParamMap = route.queryParamMap;
    const query: Query = {
      query: qParamMap.get(QueryParams.QUERY),
      authorFacet: qParamMap.getAll(QueryParams.AUTHORS),
      genreFacet: qParamMap.getAll(QueryParams.GENRES),
      albumFacet: qParamMap.getAll(QueryParams.ALBUMS),
      getText: false
    }
    return this.elasticService.searchForSongs(query, Number(qParamMap.get('size') || '20'), null);
  }

}
