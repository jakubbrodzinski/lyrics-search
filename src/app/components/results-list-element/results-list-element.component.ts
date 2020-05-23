import {Component, Input, OnInit, Output} from '@angular/core';
import {MusicBrainzService} from '../../services/music-brainz.service';

@Component({
  selector: 'app-results-list-element',
  templateUrl: './results-list-element.component.html',
  styleUrls: ['./results-list-element.component.scss']
})
export class ResultsListElementComponent implements OnInit {

  @Input()
  song: any;


  constructor(private musicBrainzService: MusicBrainzService) {
  }

  ngOnInit(): void {
  }

  @Output()
  getCoverImageUrl(albumId: string) {
    return this.musicBrainzService.getCoverImageURL(albumId);
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

  formatGenres(genres: any[]): string {
    let text = '';
    for (let i = 0; i < genres.length; i++) {
      text += genres[i] + ', ';
    }
    if (text.length > 0) {
      text = text.substr(0, text.length - 2);
    }
    return 'Genres: ' + text;
  }

}
