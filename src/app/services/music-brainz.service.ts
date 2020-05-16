import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Author} from "../models/music-brainz";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MusicBrainzService {
  private ARTIST_DETAILS_URL = 'http://musicbrainz.org/ws/2/artist';
  private COVER_ARCHIVE_URL = '';

  constructor(private http: HttpClient) {
  }

  // check https://musicbrainz.org/doc/Artist
  getAuthorDetails(authorId: string) : Observable<Author>{
    const httpParams = new HttpParams()
      .set('inc', 'aliases+ratings')
      .set('fmt', 'json');

    return this.http.get<Author>(`${this.ARTIST_DETAILS_URL}/${authorId}`, {params: httpParams})
  }

  // check https://musicbrainz.org/doc/Cover_Art_Archive
  getCoverImage(albumId: string) {

  }
}
