import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @Output() ocultarMenu: EventEmitter<any> = new EventEmitter<any>();
  private URL_SER = environment.apiUrl;

  constructor(private http: HttpClient,) { }

  loginApi(login: any) {
    return this.http.post(
      `${this.URL_SER}api/Usuarios/login`,
      login
    );
  }

  recuperaarClaveApi(correo: any) {
    return this.http.post(
      `${this.URL_SER}api/Usuarios/recuperarContrasena`,
      correo
    );
  }
}
