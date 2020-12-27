import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Noticia } from 'src/app/model/noticia.model';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-ver-noticia',
  templateUrl: './ver-noticia.component.html'
})
export class VerNoticiaComponent implements OnInit {

  noticiaTitulo: string
  noticia: Noticia[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.noticiaTitulo = this.activatedRoute.snapshot.params.titulo
    this.firebaseService.getNoticiaByTitulo(this.noticiaTitulo).subscribe(data => {
      this.noticia = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Noticia
        } 
      })
    // this.firebaseService.getImagem().subscribe(downloadURL => {
    //   this.previaNoticia.imagem = downloadURL
    // })
    })
  }

  backButton() {
    // this.location.back()
    this.router.navigateByUrl(`/menu`)
  }

}
