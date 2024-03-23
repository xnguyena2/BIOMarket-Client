import { environment } from "../config/AppValue";

export class SearchQuery {
  public group_id: string = environment.groupID;
  public query: string = '';
  public page: number = 0;
  public size: number = 0;
  public filter: string = '';

  constructor(q: string, p: number, s: number, f: string) {
    if (f === '') {
      f = 'default';
    }
    this.query = q;
    this.page = p;
    this.size = s;
    this.filter = f;
  }
}
