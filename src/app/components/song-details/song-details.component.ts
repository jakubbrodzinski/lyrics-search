import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {Song} from "../../models/query-result";

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  song: Song;

  constructor(route: ActivatedRoute) {
    console.log(route.snapshot.data.song)
    this.song = route.snapshot.data.song;
  }

  ngOnInit(): void {
  }

}
