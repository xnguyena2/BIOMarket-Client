
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

  static getDiscountPercent(unit: BeerUnit): number {
    return (1 - (BeerUnit.getPrice(unit) / unit.price)) * 100;
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

export interface MinPrice {
  discount_price: number;
  sell_price: number;
  discount_percent: number;
  discount_max_price: number;
}

export interface MinMaxPrice {
  min: number;
  max: number;
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

  static getFristPrice(beer: BeerSubmitData): number {
    return BeerUnit.getPrice(beer.listUnit[0]);
  }

  static getFristImg(beer: BeerSubmitData): Image {
    if (beer.images.length == 0) {
      return {

        id: 0,
        group_id: '',
        createat: '',
        imgid: '',
        tag: '',
        thumbnail: '',
        medium: '',
        large: '',
        category: '',
      };
    }
    return beer.images[0];
  }

  static getMinMaxPrice(beer: BeerSubmitData): MinMaxPrice {
    var min: number = 0;
    var max: number = 0;

    beer.listUnit.forEach(element => {
      let price = BeerUnit.getPrice(element);

      if (min == 0 || min > price) {
        min = price;
      }

      if (max == 0 || max < price) {
        max = price;
      }
    });

    return {
      min: min,
      max: max
    };
  }

  static getMinPrice(beer: BeerSubmitData): MinPrice {
    var discount_price: number = 0;
    var discount_max_price: number = 0;
    var sell_price: number = 0;
    var discount_percent: number = 0;
    beer.listUnit.forEach(element => {
      let d_p = BeerUnit.getPrice(element);
      let s_p = element.price;
      let percent = BeerUnit.getDiscountPercent(element);

      if (discount_percent == 0 || discount_percent > percent) {
        discount_percent = percent;
      }

      if (sell_price == 0 || sell_price > s_p) {
        sell_price = s_p;
      }

      if (discount_price == 0 || discount_price > d_p) {
        discount_price = d_p;
      }

      if (discount_max_price == 0 || discount_max_price < d_p) {
        discount_max_price = d_p;
      }
    });
    return {
      discount_percent: discount_percent,
      discount_max_price: discount_max_price,
      sell_price: sell_price,
      discount_price: discount_price,
    };
  }
}
