import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/app/interface/vehicle.interfaces';
import { VehicleService } from 'src/app/service/data/vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  vehicleDetails!: VehicleDetails;
  id!: number;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];    
    this.vehicleService.getVehicleById(this.id).subscribe(
      response => {
        this.vehicleDetails = response;
        console.log(this.vehicleDetails);
                
      }
    )
  }

}

export class VehicleDetails {
  constructor(
    public vehicle: Vehicle,
    public images: Images
  ) { }
}

interface Images {
  photos: string[];
}