import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {FacetEntity} from "../models/facet-entity";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Query} from "../models/query";
import {PagedResults} from "../models/query-result";
import {QueryUtils} from "../utils/query-utils";

@Injectable({
  providedIn: 'root'
})
export class ElasticService {
  private ES_URL = environment.es_url;

  constructor(private http: HttpClient) {
  }

  getFacetAuthors(query: Query): Observable<FacetEntity[]> {
    return this.getFilteredFacets(query, 'author.name');
  }

  getFacetGenres(query: Query): Observable<FacetEntity[]> {
    return this.getFilteredFacets(query, 'genres');
  }

  getFacetAlbums(query: Query): Observable<FacetEntity[]> {
    return this.getFilteredFacets(query, 'album.name');
  }

  private getFilteredFacets(query: Query, path: string): Observable<FacetEntity[]> {
    const facetQuery = {};
    facetQuery['size'] = 0;
    facetQuery['query'] = QueryUtils.convertToElasticQuery(query);
    facetQuery['aggs'] = QueryUtils.createAggregationQuery('unique_facet', path);
    return this.http.post<any>(this.ES_URL, facetQuery).pipe(
      map<any, FacetEntity[]>(json => json.aggregations['unique_facet'].buckets),
      catchError(err => {
        console.log(err);
        return from([]);
      })
    );
  }

  searchForSongs(query: Query, pageSize: number, offset: number, sortField ?: string, direction ?: string): Observable<PagedResults> {
    let elasticRequestBody = {};
    if (!query.getText)
      elasticRequestBody['_source'] = ["author", "album", "title", "date", "feats", "genres"];
    elasticRequestBody['size'] = pageSize;
    elasticRequestBody['from'] = offset;
    if (sortField) {
      const sortByCriterion = {};
      sortByCriterion[sortField] = direction || 'asc';
      elasticRequestBody['sort'] = [sortByCriterion];
    }
    elasticRequestBody['query'] = QueryUtils.convertToElasticQuery(query);
    console.log(elasticRequestBody);
    return this.http.post<any>(this.ES_URL, elasticRequestBody)
      .pipe(map<any, PagedResults>(response => {
        const hits = response.hits;
        return {
          total_size: hits.total.value,
          max_score: hits.max_score,
          results: hits.hits
        }
      }));
  }
}
