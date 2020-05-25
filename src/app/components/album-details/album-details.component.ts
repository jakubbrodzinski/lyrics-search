import {Component, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MusicBrainzService} from "../../services/music-brainz.service";
import {ActivatedRoute, Data, ParamMap, Router} from "@angular/router";
import {QueryResult} from "../../models/query-result";
import {Page} from "../../models/page";
import {Field, Sort} from "../../models/sort";
import {QueryParams} from "../../models/query-params";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnChanges, OnInit {
  queryResults: QueryResult[] = [];
  queryResultsCount: number = 0;
  queryFormControl: FormControl = new FormControl();

  startOffset: number;
  startPageSize: number;

  albumId: string = null;
  albumName: string = null;
  authorName: string = null;
  albumURL: string = null;

  constructor(private route: ActivatedRoute, private router: Router, private musicBrainzService: MusicBrainzService) {
    this.queryResults = route.snapshot.data.albumSongs.results;
    this.queryResultsCount = this.queryResults.length;

    this.albumId = this.queryResults[0]._source.album.id;
    this.albumName = this.queryResults[0]._source.album.name;
    this.authorName = this.queryResults[0]._source.author.name;
    this.albumURL = musicBrainzService.getCoverImageURL(this.albumId);
  }


  ngOnInit(): void {
    this.handleSnapshotParamMap(this.route.snapshot.queryParamMap);
    this.route.data.subscribe(data => this.handleDataChange(data));
  }

  private handleSnapshotParamMap(snapshotParamMap: ParamMap) {
    this.startPageSize = Number(snapshotParamMap.get('size') || 10);
    this.startOffset = Number(snapshotParamMap.get('offset') || 0);
  }

  private handleDataChange(data: Data) {
    if (data.albumSongs) {
      this.queryResults = data.albumSongs.results;
      this.queryResultsCount = data.albumSongs.total_size;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.albumId) {
      this.albumURL = this.musicBrainzService.getCoverImageURL(this.albumId);
    } else {
      this.albumURL = null;
    }
  }

  changeSource(event) {
    event.target.src = 'assets/no-image-available.png';
  }

  @Output()
  getCoverImageUrl() {
    return this.musicBrainzService.getCoverImageURL(this.albumId);
  }

  onPageChange(pageChange: Page) {
    return this.changeQueryParams(pageChange, 'merge');
  }

  onSortChange(sortChange: Sort) {
    if (sortChange.field === Field.NONE) {
      const qParams = {field: null, direction: null};
      return this.changeQueryParams(qParams, 'merge');
    } else {
      return this.changeQueryParams(sortChange, 'merge');
    }
  }

  private changeQueryParams(newParams: any, strategy: 'merge' | 'preserve' | '') {
    return this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newParams,
      queryParamsHandling: strategy
    });
  }

  updateParamsAndSearch() {
    const searchParams = {};
    searchParams[QueryParams.QUERY] = this.queryFormControl.value;
    searchParams[QueryParams.ALBUMS] = this.albumName;

    return this.changeQueryParams(searchParams, '');
  }

}
