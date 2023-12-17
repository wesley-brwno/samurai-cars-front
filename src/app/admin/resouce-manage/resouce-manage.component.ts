import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resouce-manage',
  templateUrl: './resouce-manage.component.html',
  styleUrls: ['./resouce-manage.component.css']
})
export class ResouceManageComponent {

  constructor(
    private router: Router
  ) {}

  onAddVehicleClick() {
    this.router.navigate(['new-vehicle']);
  }

}
