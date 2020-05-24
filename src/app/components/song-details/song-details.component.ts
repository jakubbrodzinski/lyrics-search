import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {NameIdEntity, Song} from "../../models/query-result";
import {MusicBrainzService} from "../../services/music-brainz.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  private musicMapBaseUrl = "https://www.music-map.com/";

  song: Song;
  coverImageUrl: string;

  constructor(route: ActivatedRoute, private musicBrainzService: MusicBrainzService, private sanitizer: DomSanitizer) {
    console.log(route.snapshot.data.song)
    this.song = route.snapshot.data.song;
    this.coverImageUrl = this.getCoverImageUrl(this.song.album.id);
    this.segmentSongLyrics(this.song.lyrics);
  }

  ngOnInit(): void {

  }

  segmentSongLyrics(lyrics: string) {
    let segments: string[] = [];
    lyrics.split("\\n").forEach(l => console.log(l));

    return segments;
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
