import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { Router } from  "@angular/router";
import { AngularFirestore } from  '@angular/fire/firestore';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Noticia } from '../model/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor (
    private router: Router,
    private fireStorage: AngularFireStorage,
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth) { 
    
    //verify if user is logged if yes user is puted on browser storage
    //if not user is seted with null value
    this.fireAuth.authState.subscribe(user => {
      if(user) {
        this.user = user
        localStorage.setItem('user', JSON.stringify(this.user))
      } else {
        localStorage.setItem('user', null)
      }
    })
  }

  //ATRIBUTES
  user: User
  noticias: Noticia[]
  noticia: Noticia[]
  //AUTH SECTION
  async login(email: string, password: string) {
    try {
      var result = await this.fireAuth.signInWithEmailAndPassword(email, password)
      this.router.navigate(['menu'])
    } catch(e) {
      alert(e)
    }
  }

  async logout() {
    await this.fireAuth.signOut()
    localStorage.removeItem('user')
    this.router.navigate([''])
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user
  }

  //NOTICIAS SECTION
  getNoticias() {
    return this.firestore.collection('noticias').snapshotChanges()
  }  
  
  getImagemNoticia(titulo: string) {
    try {
      return this.fireStorage.ref(titulo).getDownloadURL()
    } catch(e) {
      alert(e)
    }
  }

  getNoticiaByTitulo(titulo: string) {
    try {
      return this.firestore.collection('noticias', ref => ref.where('titulo', '==', titulo).limit(1)).snapshotChanges()
    } catch(e) {
      console.log(e)
    }
  }  

  postNoticia(noticia: Noticia) {
    this.firestore.collection('noticias').add(noticia)
    // this.firestore.collection('noticias').doc(noticia.titulo).set(noticia)
  }

  updateNoticia(noticia: Noticia, id: string) {
    this.firestore.doc('noticias/' + id).update(noticia)
  }

  //UPLOAD IMAGE SECTION
  uploadeImage(nomeImage: string, path: File) {
    // let nameImage = noticia.titulo.replace(/\s/g, "")
    // let nameImage = noticia.titulo
    this.fireStorage.upload(nomeImage, path)
  }

}
