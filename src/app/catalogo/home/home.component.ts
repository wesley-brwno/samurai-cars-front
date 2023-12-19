import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiclePage } from 'src/app/interface/vehicle-pabeable.intefaces';
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
    public vehiclePageableService: VehiclePageableService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let page = (sessionStorage.getItem('currentPage') ?? '0');
    this.vehiclePageableService.getVehiclesPageable(`?size=6&page=${page}`).subscribe(
      data => {
        this.vehiclePage = data;
        this.loadPageNumbersArray();    
      },
      error => {
        console.log(error);
      }
    );
    sessionStorage.removeItem('currentPage');
  }

  onNextPage() {
    this.executeVehiclePageableRequest(`?size=6&page=${this.vehiclePage.number + 1}`);
  }

  onPreviousPage() {
    this.executeVehiclePageableRequest(`?size=6&page=${this.vehiclePage.number - 1}`);
  }

  onSelectPage(pageNumber: number) {
    this.executeVehiclePageableRequest(`?size=6&page=${pageNumber}`);
  }

  onSeeMoreClick(vehicleId: number) {
    this.router.navigate([`vehicle-details/${vehicleId}`]);
    sessionStorage.setItem('currentPage', this.vehiclePage.number.toString());
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
