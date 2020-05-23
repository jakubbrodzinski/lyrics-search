export interface FacetEntity {
  key: string;
  doc_count: number;
}

export interface DateFacet {
  min: string;
  max: string;
}
