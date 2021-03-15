

export interface BeerUnit{
  beerUnitID: string;
  numberUnit: number;
}

export interface ProductPackage{
  deviceID:string;
  beerID:string;
  beerUnits: BeerUnit[];
}
