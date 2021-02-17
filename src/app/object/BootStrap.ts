import { from } from "rxjs";
import { BeerDetail } from './BeerDetail';

import { AppConfig } from '../config/AppConfig'

export class BootStrap {

  public static readonly TestData: BootStrap = {
    carousel: ["52b45f6bbb93495aafc0db19ecae5b68", "65aa088ef94b469fafee69816a22f245", "0b78515ba60e4112b9e56c8a3e584eaa", "f69d12637e724af180f8f5ee0055499b"],
    products: [
      {
        "beerSecondID": "456",
        "name": "beer tiger",
        "detail": "?ây là beer tiger có n?n ?? c?n cao nên chú ý khi s? d?ng:\n- bia th?m ngon\n- bia nh?p ngo?i\n- bia s?n xu?t t? hà lan",
        "category": "alcohol_drinks",
        "images": [],
        "listUnit": [
          {
            "beer": "456",
            "name": "thung",
            "price": 10,
            "discount": 10,
            "dateExpir": {
              "day": 12,
              "month": 2,
              "year": 2021
            },
            "volumetric": 0,
            "weight": 0.3,
            "beer_unit_second_id": "6694e8afa1b84574bfb97b5bb0fee89b"
          },
          {
            "beer": "456",
            "name": "lon",
            "price": 10,
            "discount": 10,
            "dateExpir": {
              "day": 12,
              "month": 2,
              "year": 2021
            },
            "volumetric": 0,
            "weight": 0.3,
            "beer_unit_second_id": "c6dd0e8c6fb4458fbf7a0cb305f76b3f"
          }
        ]
      },
      {
        "beerSecondID": "123",
        "name": "beer tiger",
        "detail": '',
        "category": "alcohol_drinks",
        "images": [],
        "listUnit": [
          {
            "beer": "123",
            "name": "thung",
            "price": 0,
            "discount": 0,
            "dateExpir": {
              "day": 0,
              "month": 0,
              "year": 0
            },
            "volumetric": 0,
            "weight": 0,
            "beer_unit_second_id": "ae3a25d91c4c44b284d17b318ec5bf46"
          },
          {
            "beer": "123",
            "name": "lon",
            "price": 0,
            "discount": 0,
            "dateExpir": {
              "day": 0,
              "month": 0,
              "year": 0
            },
            "volumetric": 0,
            "weight": 0,
            "beer_unit_second_id": "009da8e23bd84d809105d95348c56738"
          }
        ]
      }
    ]
  }
  public carousel: string[] = [];
  public products: BeerDetail[] = [];
}
