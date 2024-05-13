import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/core/interface/filtros.request';
import { ListPage } from 'src/app/core/interface/list.';
import { Producto } from 'src/app/core/interface/producto.interface';
import { ProductoService } from 'src/app/core/service/producto.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  @Input() filters: Filter
  @Output() update: EventEmitter<Producto> = new EventEmitter<Producto>();
  textSearch: string = ''
  totalRegistros = 0;
  totalRegistroPage = 0;
  limit = 10;
  offset = 0;
  currentPage: number = 0;
  totalPages: number = 1;
  list: ListPage;
  constructor(private productService: ProductoService) {
  }
  ngOnInit(): void {
    this.listar();
    this.obserbableOpertator()
  }
  listar() {
    this.productService.getAll(this.currentPage, this.limit, this.filters)
    .subscribe({
      next: (res: ListPage) => {
        this.list = res
        console.log(this.list)
      },
      error: (err: any) => {
       console.log(err)
      },
    })
  }
  eliminar (id: number) {}
  onPageChange(event: { page: number; limit: number; offset: number }): void {
    this.currentPage = event.page;
    // this.getList(event.limit, event.offset, this.currentPage);
  }
  edit(id: number) {
    this.productService.getById(id).subscribe({
      next: (res: Producto) => {
        this.update.emit(res)
      },
      error: (err: any) => {
        console.log(err)
        //this.totastService.error(err.error.error);
      },
    });
  }
  obserbableOpertator() {
    this.productService.isRegisterOrUpdate$.subscribe({
      next: (res: boolean) => {
        if (res) this.listar()
      }
    })
  }
}
