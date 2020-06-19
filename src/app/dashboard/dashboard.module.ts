import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard.route';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LocationService } from './common/helpers/location.service';
import { ListComponent } from './common/components/list/list.component';
import { MapComponent } from './common/components/map/map.component';
import { NavbarComponent } from './common/navbar/navbar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    MapComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    DashboardRoutingModule,
  ],
  providers: [LocationService],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DashboardModule { }
