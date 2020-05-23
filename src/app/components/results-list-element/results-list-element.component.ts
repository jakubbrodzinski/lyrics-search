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

}
