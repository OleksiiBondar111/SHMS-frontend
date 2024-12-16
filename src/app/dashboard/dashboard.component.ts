import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {PatientDTO} from "../patient/patient-model";
import {Store} from "@ngrx/store";
import {CommonModule} from "@angular/common";
import {ProductComponent} from "../product/product.component";
import {PlanComponent} from "../plan/plan.component";
import {NavbarComponent} from "../shared/navbar/navbar.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {FeatureComponent} from "../feature/feature.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    PlanComponent,
    NavbarComponent,
    FeatureComponent,
    FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  patients$: Observable<PatientDTO[]> = this.authService.getAllPatients();

  constructor(private authService: AuthService, private store: Store) {
  }

  ngOnInit(): void {
  }

  onTest() {
    this.authService.testInterceptor('test', 'test')
      .then(() => console.log("Test Interceptor"))
      .catch(() => console.log("Error happened"))
  }

  patientDisplay(patient: PatientDTO): string {
    return patient ? patient.firstName : '';
  }

  onPatientSelected(patient: PatientDTO) {
    console.log('Selected patient:', patient);
  }

}
