export interface Sort {
  field: Field;
  direction: Direction;
}

export enum Field {
  GENRE = 'genres', AUTHOR = 'author.name', ALBUM = 'album.name', TITLE = 'title', DATE = 'date', SCORE = '_score', NONE = 'none'
}

export enum Direction {
  DESC = 'desc', ASC = 'asc'
}
