import {Query} from "../models/query";

export class QueryUtils {
  static createBoolClause(clauseType: string, key: string, values: string[] | string) {
    const clause = {};
    clause[clauseType] = {};
    clause[clauseType][key] = values;

    return clause;
  }

  static convertToElasticQuery(query: Query): any {
    const mustBody = [];
    if (query.query) {
      const should = [
        QueryUtils.createBoolClause('match_phrase', 'lyrics', query.query),
        QueryUtils.createBoolClause('match_phrase', 'title', query.query)
      ];
      mustBody.push({bool: {should: should}});
    }
    if (query.authorFacet && query.authorFacet.length) {
      mustBody.push(QueryUtils.createBoolClause('terms', 'author.name', query.authorFacet));
    }
    if (query.albumFacet && query.albumFacet.length) {
      mustBody.push(QueryUtils.createBoolClause('terms', 'album.name', query.albumFacet));
    }
    if (query.genreFacet && query.genreFacet.length) {
      mustBody.push(QueryUtils.createBoolClause('terms', 'genres', query.genreFacet));
    }
    if(query.from){
      //TODO
    }
    if(query.to){
      //TODO
    }

    return {bool: {must: mustBody}};
  }

  static createAggregationQuery(qName: string, path: string): any {
    const aggrQuery = {};
    aggrQuery[qName] = {
      terms: {
        field: path,
        size: 500,
        order: {_key: 'asc'}
      }
    }
    return aggrQuery;
  }

  static createMinMaxDateAggregationQuery(path:string,minName: string, maxName:string): any {
    const pathQuery = {
      field: path,
      format: 'yyyy-MM-dd'
    }
    const aggQuery = {}
    aggQuery[minName]= {min: pathQuery}
    aggQuery[maxName]= {max: pathQuery}
    return aggQuery;
  }
}
