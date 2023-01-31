import { LoginService } from './../../Services/login.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  login = {
    correo: '',
    clave: '',
  };

  ngOnInit() {
    this.loginService.ocultarMenu.emit(false);
    if (localStorage.getItem('login')) {
      this.router.navigate(['home']);
    }
  }

  async recuperaarClaveApi() {
    const { value: email } = await Swal.fire({
      title: 'Recuperara contraseña',
      input: 'email',
      inputLabel: 'Digita tu correo',
      inputPlaceholder: 'prueba@gmail.com',
    });

    if (email) {
      //Swal.fire(`Entered email: ${email}`)
      let correo = {
        Email: email,
      };
      this.loginService.recuperaarClaveApi(correo).subscribe((res: any) => {
        Swal.fire(res.result);
      });
    }
  }

  loginApi() {
    // this.cargandoService.ventanaCargando();
    this.loginService.loginApi(this.login).subscribe((res: any) => {
      console.log(res);
      if (res.result == 'ok') {
        localStorage.setItem('login', res.correo);
        localStorage.setItem('usuario', res.usuario);
        this.router.navigate(['home']);
      } else {
        Swal.fire('Datos incorrectos');
      }
    });
  }
}
