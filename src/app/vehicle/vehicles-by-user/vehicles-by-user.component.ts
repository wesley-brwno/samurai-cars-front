import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/interface/vehicle.interfaces';

@Component({
  selector: 'app-vehicles-by-user',
  templateUrl: './vehicles-by-user.component.html',
  styleUrls: ['./vehicles-by-user.component.css']
})
export class VehiclesByUserComponent implements OnInit{
  @Input()
  vehiclesByUser!: VehiclesByUser;
  @Output()
  selectVehicleId = new EventEmitter();
  currentVehicleId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentVehicleId = this.route.snapshot.params['id'];    
  }


  onSelectVehicleClick(vehicleId: number) {
    this.router.navigate(['vehicle-details', vehicleId]);
    this.selectVehicleId.emit(vehicleId);
  };
}

export class VehiclesByUser {
  user_id: number;
  name: string;
  vehicles: Vehicle[];

  constructor(user_id: number, name: string, vehicles: Vehicle[]) {
    this.user_id = user_id;
    this.name = name;
    this.vehicles = vehicles;
  }
}