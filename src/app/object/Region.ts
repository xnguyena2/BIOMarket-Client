export interface AddressFormat{
  id:number;
  name:string;
}
export interface Ward extends AddressFormat{}

export interface WardContent{
  data: Ward[];
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
