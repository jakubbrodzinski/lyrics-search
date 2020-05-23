import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ElasticService} from "../services/elastic.service";
import {Song} from "../models/query-result";

@Injectable()
export class SongDetailsResolver implements Resolve<Song> {
  constructor(private elasticService: ElasticService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song> | Song {
    const songId = route.paramMap.get('song_id');
    return this.elasticService.getSongBy_Id(songId);
  }

}
