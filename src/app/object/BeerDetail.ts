
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

export interface Category {

  title: string;
  value: string;
}

export class BeerUnit {

  group_id: string = '';
  beer: string = '';
  name: string = '';
  sku?: string;
  upc?: string;
  price: number = 0;
  wholesale_price: number = 0;
  wholesale_number: number = 0;
  promotional_price: number = 0;
  inventory_number: number = 0;
  buy_price: number = 0;
  discount: number = 0;
  dateExpir?: NgbDateStruct;
  volumetric: number = 0;
  weight: number = 0;
  beer_unit_second_id: string = '';
  visible: boolean = false;
  enable_warehouse: boolean = false;
  status: string = '';

  static getDiscount(unit: BeerUnit): number {
    return unit.price * unit.discount / 100;
  }

  static getPrice(unit: BeerUnit): number {
    if (unit.promotional_price > 0) {
      return unit.promotional_price;
    }
    return unit.price * (1 - unit.discount / 100);
  }
}

export interface Image {
  id: number;
  group_id: string;
  createat: string;
  imgid: string;
  tag?: string;
  thumbnail: string;
  medium: string;
  large: string;
  category: string;
}
export interface Store {
  id: number;
  group_id: string;
  createat: string;
  name: string;
  time_open?: string;
  address?: string;
  phone: string;
  status: string;
  store_type: string;
}
export interface DeviceConfig {
  id: number;
  group_id: string;
  createat: string;
  color?: string;
  categorys: string;
  config?: string;
}

export class BeerSubmitData {
  group_id: string = '';
  beerSecondID: string = '';
  name: string = '';
  detail?: string;
  meta_search: string = '';
  category: string = '';
  unit_category_config: string = '';
  status: string = '';
  visible_web: boolean = false;

  images: Image[] = [];
  listUnit: BeerUnit[] = [];

  static getFristPrice(order: BeerSubmitData): number {
    return BeerUnit.getPrice(order.listUnit[0]);
  }
}
