import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'

import { Noticia } from '../../model/noticia.model'

@Component({
  selector: 'app-menu',
  styleUrls: ['./menu.component.css'],
  templateUrl: './menu.component.html'
})

export class MenuComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  noticias: Noticia[]
  dataSource: MatTableDataSource<Noticia>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: FirebaseService, private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getNoticias()
  }

  getNoticias() {
    this.service.getNoticias().subscribe(data => {
    this.noticias = data.map(e => {
      return {
        id: e.payload.doc.id,
        ...e.payload.doc.data() as Noticia
      } 
    })
      this.dataSource = new MatTableDataSource(this.noticias);
    })
  }

  logOutSytem() {
    this.service.logout()
  }

  verNoticia(titulo: string) {
    this.router.navigateByUrl(`/vernoticia/${titulo}`)
  }

  editarNoticia(titulo: string) {
    this.router.navigateByUrl(`/editarnoticia/${titulo}`)
  }

}