import { Component, OnInit } from '@angular/core';
import { VehiclePage } from 'src/app/service/data/vehicle-pabeable.intefaces';
import { VehiclePageableService } from 'src/app/service/data/vehicle-pageable.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  vehiclePage!: VehiclePage;
  pageNumbers: number[] = []

  constructor(
    public vehiclePageableService: VehiclePageableService
  ) {}

  ngOnInit(): void {
    this.vehiclePageableService.getVehiclesPageable("?size=5&page=0").subscribe(
      data => {
        this.vehiclePage = data;
        this.loadPageNumbersArray();    
      },
      error => {
        console.log(error);
      }
    );
  }

  onNextPage() {
    this.executeVehiclePageableRequest(`?size=5&page=${this.vehiclePage.number + 1}`);
  }

  onPreviousPage() {
    this.executeVehiclePageableRequest(`?size=5&page=${this.vehiclePage.number - 1}`);
  }

  onSelectPage(pageNumber: number) {
    this.executeVehiclePageableRequest(`?size=5&page=${pageNumber}`);
  }

  executeVehiclePageableRequest(pageable:string) {
    this.vehiclePageableService.getVehiclesPageable(`${pageable}`).subscribe(
      data => {
        this.vehiclePage = data;
      },
      error => {
        console.log(error);   
      }
    );
  }
    

  loadPageNumbersArray() {
    for (let i = 0; i < this.vehiclePage.totalPages; i++) {
      this.pageNumbers.push(i);
    }    
  }
}
