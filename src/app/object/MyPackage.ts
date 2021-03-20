import { BeerDetail } from "./BeerDetail";


export interface MyPackage {
  beer_id: string;
  beer_unit: string;
  device_id: string;
  number_unit: number;
  beerSubmitData: BeerDetail;
  processing: boolean;
}
