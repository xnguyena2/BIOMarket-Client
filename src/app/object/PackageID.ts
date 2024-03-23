export class BaseID {
  public group_id: string = '';
  public page: number = 0;
  public size: number = 0;
}

export class PackageID extends BaseID {
  public device_id: string = '';
  public package_id: string = '';
  public from: string = '';
  public to: string = '';
  public status: string = '';

  constructor(groupID: string, packageID: string) {
    super();
    this.group_id = groupID;
    this.package_id = packageID;
  }
}

