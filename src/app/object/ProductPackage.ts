import { Buyer, UserPackage, UserPackageDetail } from "./MyPackage";

export class ProductPackage extends UserPackageDetail {
  buyer: Buyer | null = null;
  product_units: UserPackage[] = [];

  constructor(packageID: string, buyer?: Buyer, productUnits?: UserPackage[]) {
    super();
    this.package_second_id = packageID;
    if (buyer) {
      this.buyer = buyer;
    }

    if (productUnits) {
      this.product_units = productUnits;
    }
  }
}
