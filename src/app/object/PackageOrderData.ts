import { MyPackage } from "./MyPackage";

export interface PackageIteamRemove {
  device_id: string;
  unit_id: string;
}

export interface PackageOrder {
  user_device_id: string;
  reciver_address: string;
  region_id: number;
  district_id: number;
  ward_id: number;
  reciver_fullname: string;
  phone_number: string;
  total_price: number;
  ship_price: number;
}

export interface BeerOrder {
  beer_second_id: string;
  voucher_second_id: string;
  total_price: number;
  ship_price: number;
}

export interface BeerUnitOrder {
  beer_second_id: string;
  beer_unit_second_id: string;
  number_unit: number;
  price: number;
  total_discount: number;
}

export interface BeerOrderData {
  beerOrder: BeerOrder;
  beerUnitOrders: BeerUnitOrder[];
}

export interface PackageOrderData {
  preOrder: boolean;
  packageOrder: PackageOrder;
  beerOrders: BeerOrderData[];
}

function convertToProductOrder(carts: MyPackage[], deviceID: string, preOrderer: boolean, address: string, region: number, district: number, ward: number, fullName: string, phone: string, voucher: string): PackageOrderData {
  let packageO: PackageOrder = {
    user_device_id: deviceID,
    reciver_address: address,
    region_id: region,
    district_id: district,
    ward_id: ward,
    reciver_fullname: fullName,
    phone_number: phone,
    total_price: 0,
    ship_price: 0
  };

  let beerOrders: BeerOrderData[] = carts.map(product => {
    let beerOrder: BeerOrder = {
      beer_second_id: product.beer_id,
      voucher_second_id: voucher,
      total_price: 0,
      ship_price: 0
    };
    let beerUnitOrders = product.beerSubmitData.listUnit.map(beerUnit => {
      let beerUnitOrder: BeerUnitOrder = {
        beer_second_id: beerUnit.beer,
        beer_unit_second_id: beerUnit.beer_unit_second_id,
        number_unit: product.number_unit,
        price: 0,
        total_discount: 0
      }
      return beerUnitOrder;
    });
    let productOrder: BeerOrderData = {
      beerOrder: beerOrder,
      beerUnitOrders: beerUnitOrders
    }
    return productOrder;
  });

  let packageOrderData: PackageOrderData = {
    preOrder: preOrderer,
    packageOrder: packageO,
    beerOrders: beerOrders
  };
  return packageOrderData;
}

export { convertToProductOrder }
