export interface AddressFormat{
  id:number;
  name:string;
}
export interface WardContent{
  data: AddressFormat[];
}
export interface District extends AddressFormat{
  wards: WardContent;
}
export interface DistrictContent{
  data: District[];
}
export interface Region extends AddressFormat{
  districts: DistrictContent;
}
