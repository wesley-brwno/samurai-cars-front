import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content, Vehicle, VehiclePage } from 'src/app/interface/vehicle-pabeable.intefaces';
import { VehiclePageableService } from 'src/app/service/data/vehicle-pageable.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  vehiclePage!: VehiclePage;
  pageNumbers: number[] = [];
  toggleSection: boolean = false;
  loggedUserId!: number;
  selectedVehicle!: Content;
  loadingContent!: boolean;

  constructor(
    public vehiclePageableService: VehiclePageableService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingContent = true;
    let page = (sessionStorage.getItem('currentPage') ?? '0');
    this.vehiclePageableService.getVehiclesPageable(`?size=6&page=${page}`).subscribe(
      data => {
        this.vehiclePage = data;
        this.loadPageNumbersArray();
        this.loadingContent = false;   
      },
      error => {
        console.log(error);
        this.loadingContent = false;   
      }
    );
    sessionStorage.removeItem('currentPage');
    this.loggedUserId = parseInt((sessionStorage.getItem('loggedUserId') ?? '-1'));
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

  onShowContactForm(content: Content) {
    this.selectedVehicle = content;
    this.toggleSection = true;
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
