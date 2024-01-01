import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URI } from 'src/app/app.constants';
import { User } from 'src/app/interface/user.interfaces';
import { VehicleByUser } from 'src/app/interface/vehicle.interfaces';
import { VehicleService } from 'src/app/service/data/vehicle.service';

@Component({
  selector: 'app-vehicles-by-user',
  templateUrl: './vehicles-by-user.component.html',
  styleUrls: ['./vehicles-by-user.component.css']
})
export class VehiclesByUserComponent implements OnInit{
  @Input()
  userId!: number;
  @Output()
  selectVehicleId = new EventEmitter();
  currentVehicleId!: number;
  vehiclesByUser!: VehicleByUser[];
  @Input()
  userName!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.currentVehicleId = this.route.snapshot.params['id'];
    this.loadVehiclesBySeller(this.userId) ;
  }

  onSelectVehicleClick(vehicleId: number) {
    this.router.navigate(['vehicle-details', vehicleId]);
    this.selectVehicleId.emit(vehicleId);
  };

  loadVehiclesBySeller(userId: number) {
    this.vehicleService.getVehiclesByUser(userId).subscribe(
      response => {
        this.vehiclesByUser = response;              
      },
      error => {
        console.log(error);
      }
    );
  }
}