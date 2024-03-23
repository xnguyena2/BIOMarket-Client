import { BeerSubmitData } from "./BeerDetail";

export class SearchResult {
  public count: number = 0;
  public result: BeerSubmitData[] = [];
  public searchTxt: string = '';
  public isResetFilter: boolean = false;
  public isResetPage: boolean = false;

}
