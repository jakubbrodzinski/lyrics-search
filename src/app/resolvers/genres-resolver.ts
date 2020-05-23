import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ElasticService} from "../services/elastic.service";
import {FacetEntity} from "../models/facet-entity";
import {AbstractQueryResolver} from "../models/abstract-query-resolver";
import {map, tap} from "rxjs/operators";

@Injectable()
export class GenresResolver extends AbstractQueryResolver implements Resolve<FacetEntity[]> {
  private static OPTIONS = ["Alternative/Indie", "Blues/Jazz", "Country", "Folk", "Hip-Hop/Rap", "Metal", "Pop", "Punk", "R&B/Soul", "Rock"];

  constructor(private elasticService: ElasticService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FacetEntity[]> | FacetEntity[] {
    const qParamMap = route.queryParamMap;
    return this.elasticService.getFacetGenres(super.convertToQuery(qParamMap))
      .pipe(map<FacetEntity[], FacetEntity[]>(genres => {
          const genresMap = new Map<string, number>();
          GenresResolver.OPTIONS.forEach(g => genresMap.set(g, 0));
          genres.forEach(g => genresMap.set(g.key, g.doc_count));

          let genresArray = [];
          genresMap.forEach((v, k) => genresArray.push({key: k, doc_count: v}));
          return genresArray;
        }), tap<FacetEntity[]>(arr => arr.sort((e1, e2) => e2.doc_count - e1.doc_count)),
      );
  }
}
