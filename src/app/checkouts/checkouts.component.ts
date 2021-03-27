import { Component, OnInit } from '@angular/core';
import { District, Region, Ward, WardContent } from '../object/Region';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.scss']
})
export class CheckoutsComponent implements OnInit {

  myRegion: Region[] = [];
  myDistrict: District[] = [];
  myWard: Ward[] = [];


  constructor(private Api: APIService) { }

  ngOnInit(): void {
    this.Api.GetAllRegion(result=>{
      this.myRegion = result;
    });
  }

  changeRegion(region: string){
    const regionID:number = Number(region);
    let currentRegion = this.myRegion.find(x=>x.id === regionID);
    if(currentRegion){
      this.myDistrict = currentRegion.districts.data;
      this.myWard = [];
    }
  }

  changeDistrict(district: string){
    const districtID:number = Number(district);
    let currentDistrict = this.myDistrict.find(x=>x.id === districtID);
    if(currentDistrict){
      this.myWard = currentDistrict.wards.data;
    }
  }

}
