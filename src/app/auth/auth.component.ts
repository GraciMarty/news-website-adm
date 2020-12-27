import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  constructor(private router: Router, private firebaseService: FirebaseService) { }

  user: any

  ngOnInit(): void {
    setTimeout( () => this.user = this.firebaseService.isLoggedIn(), 3000)     
    if (this.user) {
      this.firebaseService.getNoticias()
      this.router.navigateByUrl('/menu')
    } else {
      this.router.navigateByUrl('/login')
    }
  }

}
