import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  usuario = '';

  cerrarSesion() {
    localStorage.removeItem('login');
    this.router.navigate(['login']);
  }

  ngOnInit() {
    if (localStorage.getItem('usuario')) {
      this.getUsuario(localStorage.getItem('usuario'));
    }
  }
  getUsuario(usuario: any) {
    this.usuario = usuario;
  }
}
