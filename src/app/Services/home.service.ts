import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private URL_SER = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsuario(correo: any) {
    let correoLogueado = {
      Email: correo,
    };
    return this.http.post(
      `${this.URL_SER}api/Usuarios/register`,
      correoLogueado
    );
  }

  eliminarUsuario(id: any) {
    return this.http.post(`${this.URL_SER}api/Usuarios/delete`, id);
  }
}
