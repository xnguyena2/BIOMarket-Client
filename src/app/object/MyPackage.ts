import { environment } from "../config/AppValue";
import { BeerSubmitData } from "./BeerDetail";

export class UserPackage {
  id: number = 0;
  group_id: string = '';
  createat: string = '';
  package_second_id: string = '';
  device_id: string = '';
  product_second_id: string = '';
  product_unit_second_id: string = '';
  number_unit: number = 0;
  price: number = 0;
  buy_price: number = 0;
  discount_amount: number = 0;
  discount_percent: number = 0;
  discount_promotional: number = 0;
  note: string = '';
  status: string | null = null;
  constructor(productID: string, productUnitID: string, noUnit: number) {
    this.product_second_id = productID;
    this.product_unit_second_id = productUnitID;
    this.number_unit = noUnit;
  }
}

export class ProductInPackageResponse extends UserPackage {
  beerSubmitData: BeerSubmitData = new BeerSubmitData();

  processing: boolean = false;

  static getPrice(productOrder: ProductInPackageResponse): number {
    let itemPrice = BeerSubmitData.getFristPrice(productOrder.beerSubmitData);
    productOrder.price = itemPrice;
    return (itemPrice * (1 - productOrder.discount_percent / 100) - productOrder.discount_amount) * productOrder.number_unit;
  }
}

export class Buyer {
  group_id: string = '';
  createat: string = '';
  device_id: string = '';
  reciver_fullname: string = '';
  phone_number_clean: string = '';
  phone_number: string = '';
  reciver_address: string = '';
  region_id: number = 0;
  district_id: number = 0;
  ward_id: number = 0;
  real_price: number = 0;
  total_price: number = 0;
  ship_price: number = 0;
  discount: number = 0;
  point: number = 0;
  status: string | null = null;

  constructor(deviceID: string) {
    this.device_id = deviceID;
  }
}

export class BuyerData extends Buyer {
  region: string;
  district: string;
  ward: string;

  constructor(deviceID: string, region: string, district: string, ward: string) {
    super(deviceID);
    this.region = region;
    this.district = district;
    this.ward = ward;
  }
}

export class UserPackageDetail {
  group_id: string = environment.groupID;
  createat: string = '';
  package_second_id: string = '';
  device_id: string = '';
  staff_id?: string;
  package_type?: string;
  table_id?: string;
  table_name?: string;
  area_id?: string;
  area_name?: string;
  voucher?: string;
  price: number = 0;
  payment: number = 0;
  discount_amount: number = 0;
  discount_percent: number = 0;
  discount_promotional: number = 0;
  discount_by_point: number = 0;
  additional_fee: number = 0;
  additional_config?: string;
  ship_price: number = 0;
  cost: number = 0;
  profit: number = 0;
  point: number = 0;
  note?: string;
  image?: string;
  progress?: string;
  status?: string;
}

export class PackageDataResponse extends UserPackageDetail {
  items: ProductInPackageResponse[] = [];
  buyer?: BuyerData;

  static getPrice(order: PackageDataResponse): number {
    order.price = order.items.reduce((t, x) => t + ProductInPackageResponse.getPrice(x), 0);
    return order.price;
  }

  static getCartNo(order: PackageDataResponse): number {
    return order.items.reduce((t, x) => t + x.number_unit, 0);
  }
}
