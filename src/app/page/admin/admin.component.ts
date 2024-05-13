
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Filter } from 'src/app/core/interface/filtros.request';
import { Producto } from 'src/app/core/interface/producto.interface';
import { AsesorVentaService } from 'src/app/core/service/asesorVenta.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  private modalService = inject(NgbModal);
  @Input() filters: Filter
  @Output() update: EventEmitter<Producto> = new EventEmitter<Producto>();
  textSearch: string = ''
  totalRegistros = 0;
  totalRegistroPage = 0;
  limit = 10;
  offset = 0;
  currentPage: number = 0;
  totalPages: number = 1;
  list: any = [];
  constructor(private asesorService: AsesorVentaService, config: NgbModalConfig) {
    config.backdrop = 'static';
		config.keyboard = false;
  }
  ngOnInit(): void {
    this.listar();
  }
  listar() {
    this.asesorService.getAll()
    .subscribe({
      next: (res: any) => {
        this.list = res.data
      },
      error: (err: any) => {
       console.log(err)
      },
    })
  }
  getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.BACKDROP_CLICK:
        this.modalService.dismissAll();
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  eliminar (id: number) {}
  onPageChange(event: { page: number; limit: number; offset: number }): void {
    this.currentPage = event.page;
    // this.getList(event.limit, event.offset, this.currentPage);
  }
 
  
  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }
  isRegisterOrUpdate (event: any) {
    this.listar()
    this.modalService.dismissAll();
  }
}
