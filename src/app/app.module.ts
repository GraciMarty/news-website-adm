import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module'
import { QuillModule } from 'ngx-quill'
import { ReactiveFormsModule } from '@angular/forms'

import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireAuthModule } from '@angular/fire/auth'

import { FirebaseService } from './shared/firebase.service'
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { MenuComponent } from './sistema/menu/menu.component';
import { NoticiaComponent } from './sistema/noticia/noticia.component';
import { ArtigoComponent } from './sistema/artigo/artigo.component';
import { MembroComponent } from './sistema/membro/membro.component';
import { CriarNoticiaComponent } from './sistema/noticia/criar-noticia/criar-noticia.component';
import { EditarNoticiaComponent } from './sistema/noticia/editar-noticia/editar-noticia.component';
import { VerNoticiaComponent } from './sistema/noticia/ver-noticia/ver-noticia.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    MenuComponent,
    NoticiaComponent,
    ArtigoComponent,
    MembroComponent,
    CriarNoticiaComponent,
    EditarNoticiaComponent,
    VerNoticiaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    QuillModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
