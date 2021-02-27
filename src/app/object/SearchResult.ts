import { BeerDetail } from "./BeerDetail";

export class SearchResult {
  public count: number = 0;
  public result: BeerDetail[] = [];
  public searchTxt: string = '';
  public isResetFilter: boolean = false;
  public isResetPage: boolean = false;

  public static readonly IGNORE: SearchResult = {
    "count": 5.0,
    "searchTxt": 'IGNORE',
    "result": [],
    "isResetFilter": false,
    "isResetPage": false
  }

  public static readonly TestData: SearchResult = {
    "count": 5.0,
    "searchTxt": '',
    "isResetFilter": false,
    "isResetPage": false,
    "result": [
      {
        "beerSecondID": "beer_order1",
        "name": "beer tiger",
        "detail": "bia for order 1",
        "category": "alcohol_drinks",
        "images": [],
        "listUnit": [
          {
            "beer": "beer_order1",
            "name": "lon",
            "price": 20.0,
            "discount": 20.0,
            "dateExpir": {
              "day": 18,
              "month": 2,
              "year": 2021
            },
            "volumetric": 0.0,
            "weight": 1.0,
            "beer_unit_second_id": "ba94a2b73b984e20bf92a2578fe75d55"
          },
          {
            "beer": "beer_order1",
            "name": "thung",
            "price": 10.0,
            "discount": 10.0,
            "dateExpir": {
              "day": 18,
              "month": 2,
              "year": 2021
            },
            "volumetric": 0.0,
            "weight": 0.3,
            "beer_unit_second_id": "f221278797a6451d8dd1be427cad9214"
          }
        ]
      },
      {
        "beerSecondID": "beer_order2",
        "name": "beer tiger",
        "detail": "bia for order 2",
        "category": "alcohol_drinks",
        "images": [],
        "listUnit": [
          {
            "beer": "beer_order2",
            "name": "thung",
            "price": 50.0,
            "discount": 50.0,
            "dateExpir": {
              "day": 18,
              "month": 2,
              "year": 2021
            },
            "volumetric": 0.0,
            "weight": 0.0,
            "beer_unit_second_id": "4d9db56f631c48d19c647360d012c683"
          },
          {
            "beer": "beer_order2",
            "name": "lon",
            "price": 60.0,
            "discount": 50.0,
            "dateExpir": {
              "day": 18,
              "month": 2,
              "year": 2021
            },
            "volumetric": 0.0,
            "weight": 0.0,
            "beer_unit_second_id": "c7c0a8d247d947e094b77724c86a2589"
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
            "name": "lon",
            "price": 0.0,
            "discount": 0.0,
            "dateExpir": {
              "day": 0,
              "month": 0,
              "year": 0
            },
            "volumetric": 0.0,
            "weight": 0.0,
            "beer_unit_second_id": "812bc3828a6147c0bd9edba41c16e695"
          },
          {
            "beer": "123",
            "name": "thung",
            "price": 0.0,
            "discount": 0.0,
            "dateExpir": {
              "day": 0,
              "month": 0,
              "year": 0
            },
            "volumetric": 0.0,
            "weight": 0.0,
            "beer_unit_second_id": "ee6917429e00440b988f62c29ee31ca9"
          }
        ]
      },
      {
        "beerSecondID": "456",
        "name": "beer tiger",
        "detail": "Đây là beer tiger có nồn độ cồn cao nên chú ý khi sử dụng:\n- bia thơm ngon\n- bia nhập ngoại\n- bia sản xuất từ hà lan",
        "category": "alcohol_drinks",
        "images": [
          "c786e9d423ba4ab19b744db14a982ce0",
          "8749a9c8460348b787641051ce10abd2",
          "b4ff979ca3a749bfa96d6596f7bb2a80",
          "0a5d7fec5dd949819433c5e2df205130"
        ],
        "listUnit": [
          {
            "beer": "456",
            "name": "lon",
            "price": 10.0,
            "discount": 10.0,
            "dateExpir": {
              "day": 18,
              "month": 2,
              "year": 2021
            },
            "volumetric": 0.0,
            "weight": 0.3,
            "beer_unit_second_id": "b4e0bbf35a734c72a9b6876b90829f19"
          },
          {
            "beer": "456",
            "name": "thung",
            "price": 10.0,
            "discount": 10.0,
            "dateExpir": {
              "day": 18,
              "month": 2,
              "year": 2021
            },
            "volumetric": 0.0,
            "weight": 0.3,
            "beer_unit_second_id": "d8c3fdec5052440b8ebd3c65dd73a794"
          }
        ]
      },
      {
        "beerSecondID": "beer_order3",
        "name": "beer tiger",
        "detail": "bia for order 3",
        "category": "alcohol_drinks",
        "images": [],
        "listUnit": [
          {
            "beer": "beer_order3",
            "name": "lon",
            "price": 110.0,
            "discount": 0.0,
            "dateExpir": {
              "day": 0,
              "month": 0,
              "year": 0
            },
            "volumetric": 0.0,
            "weight": 0.0,
            "beer_unit_second_id": "14211309d70c489b8a309c45bd1acbdd"
          },
          {
            "beer": "beer_order3",
            "name": "thung",
            "price": 100.0,
            "discount": 10.0,
            "dateExpir": {
              "day": 18,
              "month": 2,
              "year": 2021
            },
            "volumetric": 0.0,
            "weight": 0.0,
            "beer_unit_second_id": "d4e50c9031e941258054cf14f4ee019d"
          }
        ]
      }
    ]
  }
}
