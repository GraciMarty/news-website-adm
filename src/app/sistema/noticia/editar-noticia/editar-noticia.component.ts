import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FirebaseService } from 'src/app/shared/firebase.service';

import { Noticia } from 'src/app/model/noticia.model';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.component.html'
})
export class EditarNoticiaComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  @ViewChild('fileInput')
  
  fileInput;
  file: File | null = null;
  imgUrl: any
  textCard: string
  editorForm: FormGroup
  previaNoticia: Noticia = new Noticia()
  imagemURL: string
  noticiaTitulo: string
  noticia: Noticia[]
  noticiaId: string = ''

  ngOnInit(): void {
    this.editorForm = this.fb.group({
      editor: this.fb.control('', [Validators.required]),
      titulo: this.fb.control('', [Validators.required]),
      autor: this.fb.control('', [Validators.required]),
    })

    this.noticiaTitulo = this.activatedRoute.snapshot.params.titulo
    this.firebaseService.getNoticiaByTitulo(this.noticiaTitulo).subscribe(data => {
      this.noticia = data.map(e => {
        this.noticiaId = e.payload.doc.id
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Noticia
        }
      })
      this.previaNoticia = this.noticia[0]
      this.editorForm.controls['editor'].setValue(this.previaNoticia.corpo)
      this.editorForm.controls['titulo'].setValue(this.previaNoticia.titulo)
      this.editorForm.controls['autor'].setValue(this.previaNoticia.autor)
      this.imgUrl = this.previaNoticia.imagem
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
    if(this.file) {
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
        // this.firebaseService.postNoticia(noticia)
        this.firebaseService.updateNoticia(noticia, this.noticiaId)
        alert('Edição Finalizada')
        this.router.navigateByUrl(`/menu`)
      })
    } else if(!this.file) {
      const noticia: Noticia  = {
        autor: form.get('autor').value,
        corpo: form.get('editor').value,
        titulo: form.get('titulo').value,
        data: new Date(),
        imagem: this.previaNoticia.imagem
      }
      // this.firebaseService.postNoticia(noticia)
      this.firebaseService.updateNoticia(noticia, this.noticiaId)
      alert('Edição Finalizada')
      this.router.navigateByUrl(`/menu`)
    }
  }
  
}
