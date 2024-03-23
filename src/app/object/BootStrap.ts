import { BeerSubmitData, DeviceConfig, Store } from './BeerDetail';

export class BootStrap {
  deviceConfig!: DeviceConfig;
  store!: Store;
  benifit?: any;
  carousel!: string[];
  products!: BeerSubmitData[];
}
