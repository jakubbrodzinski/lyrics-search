import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MusicBrainzService} from '../../services/music-brainz.service';
import {QueryResult} from "../../models/query-result";

@Component({
  selector: 'app-results-list-element',
  templateUrl: './results-list-element.component.html',
  styleUrls: ['./results-list-element.component.scss']
})
export class ResultsListElementComponent implements OnChanges {

  @Input()
  song: QueryResult;
  albumURL: string = null;


  constructor(private musicBrainzService: MusicBrainzService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const albumId = this.song._source.album.id;
    if (albumId)
      this.albumURL = this.musicBrainzService.getCoverImageURL(albumId);
    else
      this.albumURL = null;
  }

  changeSource(event) {
    event.target.src = 'assets/no-image-available.png';
  }

}
