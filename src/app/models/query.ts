export interface Query {
  query: string;
  authorFacet: string[];
  genreFacet: string[];
  albumFacet: string[];
  from: string,
  to: string,
  getText: boolean;
}
