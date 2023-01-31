import { HomeService } from './../../Services/home.service';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private loginService: LoginService,
    private homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginService.ocultarMenu.emit(true);
    if (!localStorage.getItem('login')) {
      this.router.navigate(['login']);
    }

    this.getUsuario();
  }

  getUsuario() {
    // this.cargandoService.ventanaCargando();
    this.homeService
      .getUsuario(localStorage.getItem('login'))
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res);
      });
  }

  displayedColumns: string[] = [
    'nombre',
    'email',
    'telefono',
    'usuario',
    'tipoUser',
    'editar',
    'eliminar',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editarUsuario(id: Number) {
    console.log(id);
  }

  eliminarUsuario(idEntra: Number) {
    let idEliminar = {
      id: idEntra,
    };
    // this.cargandoService.ventanaCargando();
    this.homeService.eliminarUsuario(idEliminar).subscribe((res: any) => {
      if(res.result == "Eliminado exitosamente"){
        Swal.fire(res.result);
        this.getUsuario();
      }else{
        Swal.fire(res.result);
      }
    });
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(filterValue: any) {
    var value =
      filterValue.target.value == null ? '' : filterValue.target.value;
    value = value.trim(); // Remove whitespace
    value = value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = value;
  }
}

export interface PeriodicElement {
  nombre: string;
  correo: string;
  telefono: string;
  usuario: string;
  tipoUsuario: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    nombre: 'Emmanuel',
    correo: 'rente142@gmail.com',
    telefono: '333333',
    usuario: 'reykmrm',
    tipoUsuario: 'Super admin',
  },
];
