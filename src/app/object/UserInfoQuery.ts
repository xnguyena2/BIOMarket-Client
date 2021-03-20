export class UserInfoQuery {
  public id: string = '';
  public page: number = 0;
  public size: number = 0;

  constructor(p:number, s:number, id:string){
    this.page = p;
    this.size = s;
    this.id = id;
  }
}
