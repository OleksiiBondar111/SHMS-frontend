import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "../shared/footer/footer.component";
import {NavbarComponent} from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

}
