import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationResponse} from "../auth/model/auth.model";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {PatientDTO} from "../patient/patient-model";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.URL; // Replace with your API URL

  constructor(private http: HttpClient) {
  }


  testInterceptor(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/testInterceptor`, {
      username,
      password,
    }).toPromise();
  }

  getAllPatients() {
    if (!environment.production) {
      const data: any = environment.mock.rest.patientListMock;
      return of(data);
    }
    return this.http.get<PatientDTO[]>(`${this.apiUrl}/patient`)
  }

  authenticate(email: string, password: string) {
    // if (!environment.production) {
    //   return of({access_token: '123'});
    // }

    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/authenticate`, {
      email,
      password,
    }).pipe(
      catchError((error) => {
        // Handle error accordingly
        console.error('Login error', error);
        throw error; // Rethrow the error to be caught in the effect
      })
    );
  }
}
