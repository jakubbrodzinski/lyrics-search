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

  getFacetAuthors(): Observable<FacetEntity[]> {
    return this.getAllUniqueValues('author.name', true);
  }

  getFacetGenres(): Observable<FacetEntity[]> {
    return this.getAllUniqueValues('genres', true);
  }

  getFacetAlbums(): Observable<FacetEntity[]> {
    return this.getAllUniqueValues('album.name', true);
  }

  getFilteredFacetAlbums(author: FacetEntity[], feats: FacetEntity[]): Observable<FacetEntity[]> {
    return undefined;
  }

  private getAllUniqueValues(path: string, asc: boolean): Observable<FacetEntity[]> {
    return this.http.post<any>(this.ES_URL, {
      size: 0,
      aggs: {
        unique_facet: {
          terms: {
            field: path,
            size: 15,//size: 2147483647,
            order: {
              _key: asc ? "asc" : "desc"
            }
          }
        }
      }
    }).pipe(
      map<any, FacetEntity[]>(json => json.aggregations.unique_facet.buckets),
      catchError(err => {
        console.log(err);
        return from([]);
      })
    );
  }

  searchForSongs(query: Query, pageSize: number, pageNumber: number): Observable<PagedResults> {
    let elasticRequestBody = {};
    if (!query.getText)
      elasticRequestBody['_source'] = ["author", "album", "title", "date", "feats", "genres"];
    elasticRequestBody['size'] = pageSize
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
