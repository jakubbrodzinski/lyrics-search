import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {FacetEntity} from "../models/facet-entity";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";

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

  private getAllUniqueValues(path: string, asc: boolean): Observable<FacetEntity[]> {
    return this.http.post<any>(this.ES_URL, {
      size: 0,
      aggs: {
        unique_facet: {
          terms: {
            field: path,
            size: 2147483647,
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

  getFilteredFacetAlbums(author: FacetEntity[], feats: FacetEntity[]): Observable<FacetEntity[]> {
    return undefined;
  }
}
