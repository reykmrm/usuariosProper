import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,) { }
  private URL_SER = environment.apiUrl;


  registerApi(usuario: any) {
    return this.http.post(
      `${this.URL_SER}api/Usuarios`,
      usuario
    );
  }

  updateApi(usuario: any) {
    return this.http.post(
      `${this.URL_SER}api/Usuarios/update`,
      usuario
    );
  }

  getIdApi(id: any) {
    return this.http.post(`${this.URL_SER}api/Usuarios/GetUsuarioId`, id);
  }

}
