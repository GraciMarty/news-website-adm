import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { FirebaseService } from '../../../shared/firebase.service'

import { Noticia } from 'src/app/model/noticia.model';

@Component({
  selector: 'app-criar-noticia',
  templateUrl: './criar-noticia.component.html'
})
export class CriarNoticiaComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private router: Router) { }

  @ViewChild('fileInput')
  
  fileInput;
  file: File | null = null;
  imgUrl: any
  textCard: string
  editorForm: FormGroup
  previaNoticia: Noticia = new Noticia()
  imagemURL: string

  ngOnInit(): void {
    this.editorForm = this.fb.group({
      editor: this.fb.control('', [Validators.required]),
      titulo: this.fb.control('', [Validators.required]),
      autor: this.fb.control('', [Validators.required]),
    })
  }
  
  onChangeFileInput(event) {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    let reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (event) => {
      this.imgUrl = event.target.result
    }
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  editorContent(form: FormGroup) {
    this.previaNoticia.autor = form.get('autor').value
    this.previaNoticia.corpo = form.get('editor').value
    this.previaNoticia.titulo = form.get('titulo').value
    this.previaNoticia.data = new Date()
  }

  async postarNoticia(form: FormGroup) {
    let imageName = form.get('titulo').value.replace(/\s/g, "") // Retirar espaços do titulo da noticia
    await this.firebaseService.uploadeImage(imageName, this.file)
    await this.firebaseService.getImagemNoticia(imageName).subscribe(imageURL => {
      this.imagemURL = imageURL
      const noticia: Noticia  = {
        autor: form.get('autor').value,
        corpo: form.get('editor').value,
        titulo: form.get('titulo').value,
        data: new Date(),
        imagem: this.imagemURL
      }
      this.firebaseService.postNoticia(noticia)
      alert('Notícia Postada')
      this.router.navigateByUrl(`/vernoticia/${noticia.titulo}`)
    })
  }
}
