
export interface NgbDateStruct {
  /**
   * The year, for example 2016
   */
  year: number;
  /**
   * The month, for example 1=Jan ... 12=Dec
   */
  month: number;
  /**
   * The day of month, starting at 1
   */
  day: number;
}

export interface BeerUnit {
  beer: string;
  name: string;
  price: number;
  discount: number;
  dateExpir: NgbDateStruct;
  weight: number;
  volumetric: number;
  beer_unit_second_id: string;
}

interface Image {
  imgid: string;
  thumbnail: string;
  medium: string;
  large: string;

}

export interface BeerDetail {
  beerSecondID: string;
  name: string;
  detail: string;
  category: string;
  status: string;
  images: Image[];

  listUnit: BeerUnit[];
}
