import { RegisterService } from './../../Services/register.service';
import { AfterViewInit, Component } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements AfterViewInit {
  constructor(
    private loginService: LoginService,
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ocultarMenu = false;
  correo = false;
  btnCancelar = false;
  btnLogin = true;
  ngAfterViewInit() {}

  clave = true;

  register = {
    id: 0,
    Nombre: '',
    apellido: '',
    Email: '',
    Usuario: '',
    Contrasena: '',
    Telefono: '',
    Estado: 'Activo',
    IdTipoUsuario: 3,
  };

  ngOnInit() {
    this.loginService.ocultarMenu.emit(this.ocultarMenu);
    if (this.route.snapshot.paramMap.get('id')) {
      this.clave = false;
      this.correo = true;
      this.btnCancelar = true;
      this.btnLogin = false;
      let id = this.route.snapshot.paramMap.get('id');

      this.modificarUsuario(id);
    }
  }

  modificarUsuario(id: any) {
    let idActualizar = {
      id: parseInt(id),
    };
    this.registerService.getIdApi(idActualizar).subscribe((res: any) => {
      this.register.id = res.id;
      this.register.Nombre = res.nombre;
      this.register.apellido = res.apellido;
      this.register.Email = res.email;
      this.register.Usuario = res.usuario;
      this.register.Contrasena = res.contrasena;
      this.register.Telefono = res.telefono;
      (this.register.Estado = 'Activo'),
        (this.register.IdTipoUsuario = res.idTipoUsuario);
    });
  }

  registerApi() {
    // this.cargandoService.ventanaCargando();
    if (this.route.snapshot.paramMap.get('id')) {
      this.clave = false;
      let id = this.route.snapshot.paramMap.get('id');

      this.registerService.updateApi(this.register).subscribe((res: any) => {
        console.log(res);
        if (res.result == 'Registro actualizado') {
          this.router.navigate(['home']);
          Swal.fire(res.result);
        } else {
          Swal.fire(res.result);
        }
      });

      return;
    }

    this.registerService.registerApi(this.register).subscribe((res: any) => {
      if (res.result == 'Registro exitoso') {
        this.router.navigate(['home']);
        Swal.fire(res.result);
      } else {
        Swal.fire(res.result);
      }
    });
  }
}
