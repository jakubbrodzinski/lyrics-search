export interface PagedResults {
  total_size: number;
  max_score: number;
  results: QueryResult[];
}

export interface QueryResult {
  _id: string;
  _score: number;
  _source: Song;
}

export interface Song {
  album: NameIdEntity;
  author: NameIdEntity;
  title: string;
  date: string;
  feats: NameIdEntity[];
  genres: string[];
  lyrics: string;
}

export interface NameIdEntity {
  name: string;
  id: string;
}
