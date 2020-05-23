import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ElasticService} from "../services/elastic.service";
import {FacetEntity} from "../models/facet-entity";
import {AbstractQueryResolver} from "../models/abstract-query-resolver";
import {Song} from "../models/query-result";

@Injectable()
export class SongDetailsResolver extends AbstractQueryResolver implements Resolve<Song> {
  constructor(private elasticService: ElasticService) {
    super();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song> | Song {
    const songId = route.paramMap.get('song_id');
    return this.elasticService.getSongBy_Id(songId);
  }

}
