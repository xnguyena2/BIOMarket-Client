export class UserInfoQuery {
  public group_id: string = '';
  public id: string = '';
  public page: number = 0;
  public size: number = 0;

  constructor(group: string, p: number, s: number, id: string) {
    this.group_id = group;
    this.page = p;
    this.size = s;
    this.id = id;
  }
}
