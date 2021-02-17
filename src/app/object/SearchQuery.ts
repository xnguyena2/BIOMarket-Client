export class SearchQuery {
  public query: string = '';
  public page: number = 0;
  public size: number = 0;

  constructor(q:string, p:number, s:number){
    this.query = q;
    this.page = p;
    this.size = s;
  }
}
