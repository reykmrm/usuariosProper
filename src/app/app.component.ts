import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginService } from './Services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}
  menuVisible = false;

  ngOnInit() {
    setTimeout(() => {
      this.loginService.ocultarMenu.subscribe((dato) => {
        this.menuVisible = dato;
        console.log('hola: ', this.menuVisible);
      });
    }, 1000);
  }

  
}
