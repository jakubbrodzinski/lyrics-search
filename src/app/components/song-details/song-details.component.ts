import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {NameIdEntity, Song} from "../../models/query-result";
import {MusicBrainzService} from "../../services/music-brainz.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Author} from "../../models/music-brainz";

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  private musicMapBaseUrl = "https://www.music-map.com/";

  song: Song;
  coverImageUrl: string;
  author: Author;

  constructor(route: ActivatedRoute, private musicBrainzService: MusicBrainzService, private sanitizer: DomSanitizer) {
    console.log(route.snapshot.data.song)
    this.song = route.snapshot.data.song;
    this.coverImageUrl = this.getCoverImageUrl(this.song.album.id);

    this.musicBrainzService.getAuthorDetails(this.song.author.id).subscribe(value => {
      this.author = value;
    });
  }

  ngOnInit(): void {

  }

  getArtistString(author: NameIdEntity, feats: any[]) {
    return author.name + ' ' + '(' + this.formatFeatsNames(feats) + ')';
  }

  formatFeatsNames(feats: any[]): string {
    let text = '';
    for (let i = 0; i < feats.length; i++) {
      text += feats[i].name + ', ';
    }
    if (text.length > 0) {
      text = text.substr(0, text.length - 2);
    }
    return 'Featuring: ' + text;
  }

  @Output()
  musicMapURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.musicMapBaseUrl + encodeURIComponent(this.song.author.name));
  }

  @Output()
  getCoverImageUrl(albumId: string) {
    return this.musicBrainzService.getCoverImageURL(albumId);
  }

}
