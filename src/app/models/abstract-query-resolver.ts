import {ParamMap} from "@angular/router";
import {Query} from "./query";
import {QueryParams} from "./query-params";

export abstract class AbstractQueryResolver {
  protected convertToQuery(qParamMap: ParamMap): Query {
    return {
      query: qParamMap.get(QueryParams.QUERY),
      authorFacet: qParamMap.getAll(QueryParams.AUTHORS),
      genreFacet: qParamMap.getAll(QueryParams.GENRES),
      albumFacet: qParamMap.getAll(QueryParams.ALBUMS),
      from: qParamMap.get(QueryParams.FROM),
      to: qParamMap.get(QueryParams.TO),
      getText: false
    }
  }
}
