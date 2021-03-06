import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ElasticService} from "../services/elastic.service";
import {FacetEntity} from "../models/facet-entity";
import {AbstractQueryResolver} from "../models/abstract-query-resolver";
import {tap} from "rxjs/operators";

@Injectable()
export class AlbumsResolver extends AbstractQueryResolver implements Resolve<FacetEntity[]> {
  constructor(private elasticService: ElasticService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FacetEntity[]> | FacetEntity[] {
    const qParamMap = route.queryParamMap;
    return this.elasticService.getFacetAlbums(super.convertToEmptyQuery(qParamMap))
      .pipe(tap<FacetEntity[]>(arr => arr.sort((e1, e2) => e2.doc_count - e1.doc_count)));
  }

}
