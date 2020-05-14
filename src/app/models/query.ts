export interface Query {
  query: string;
  authorFacet: string[];
  genreFacet: string[];
  albumFacet: string[];
  getText: boolean;
}
