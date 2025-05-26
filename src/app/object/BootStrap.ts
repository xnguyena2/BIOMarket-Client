import { BeerSubmitData, DeviceConfig, Store } from './BeerDetail';

export class BootStrap {
  deviceConfig!: DeviceConfig;
  store!: Store;
  benifit?: any;
  carousel!: string[];
  products!: BeerSubmitData[];
  web_config!: string | null;
}

export interface FilterOption {
  value: string;
  title: string;
}

export interface CategoryOption {
  value: string;
  title: string;
}

export class WebConfigData {
  hostUrl: string;
  devHostUrl: string;
  filterDrop: FilterOption[];
  categoryDrop: CategoryOption[];
  returnExchangePolicy: string;
  stickyNotify: string;
  email: string;
  facebook: string;
  logo: string;
  headerSlogan: string;

  constructor(
    data?: Partial<WebConfigData>
  ) {
    this.hostUrl = data?.hostUrl ?? '';
    this.devHostUrl = data?.devHostUrl ?? '';
    this.filterDrop = data?.filterDrop ?? [];
    this.categoryDrop = data?.categoryDrop ?? [];
    this.returnExchangePolicy = data?.returnExchangePolicy ?? '';
    this.stickyNotify = data?.stickyNotify ?? 'Freeship Đơn Hàng Trên 1 triệu nội thành HCM.';
    this.email = data?.email ?? '';
    this.facebook = data?.facebook ?? '';
    this.logo = data?.logo ?? '';
    this.headerSlogan = data?.headerSlogan ?? '';
  }

  static fromJson(json: any): WebConfigData {
    return new WebConfigData({
      hostUrl: json['HostUrl'] ?? '',
      devHostUrl: json['DevHostUrl'] ?? '',
      filterDrop: (json['FilterDrop'] ?? []).map((item: any) => ({
        value: item.value,
        title: item.title
      })),
      categoryDrop: (json['CategoryDrop'] ?? []).map((item: any) => ({
        value: item.value,
        title: item.title
      })),
      returnExchangePolicy: json['return_exchange_policy'] ?? '',
      stickyNotify: json['stickyNotify'] ?? '',
      email: json['email'] ?? '',
      facebook: json['facebook'] ?? '',
      logo: json['logo'] ?? '',
      headerSlogan: json['header_slogan'] ?? ''
    });
  }

  static fromJsonString(jsonStr: string): WebConfigData {
    try {
      const json = JSON.parse(jsonStr);
      return WebConfigData.fromJson(json);
    } catch (e) {
      throw new Error('Invalid JSON string for WebConfigData');
    }
  }

  toJson(): any {
    return {
      HostUrl: this.hostUrl,
      DevHostUrl: this.devHostUrl,
      FilterDrop: this.filterDrop.map(f => ({ value: f.value, title: f.title })),
      CategoryDrop: this.categoryDrop.map(c => ({ value: c.value, title: c.title })),
      return_exchange_policy: this.returnExchangePolicy,
      stickyNotify: this.stickyNotify,
      email: this.email,
      facebook: this.facebook,
      logo: this.logo,
      header_slogan: this.headerSlogan
    };
  }
}
