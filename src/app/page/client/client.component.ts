
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Filter } from 'src/app/core/interface/filtros.request';
import { Producto } from 'src/app/core/interface/producto.interface';
import { AsesorVentaService } from 'src/app/core/service/asesorVenta.service';
import { ClientService } from 'src/app/core/service/client.service';
import { DepositService } from 'src/app/core/service/deposit.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { TokenService } from 'src/app/util/token.service';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
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
  recargarForm: FormGroup;
  submitted = false;
  archivoSeleccionado: File | null = null;
  isLoading = false
  listBank: any = [];
  idRecarga = ''
  constructor(private formBuilder: FormBuilder,
     config: NgbModalConfig, private clientService: ClientService, private totastService: NotificationService, private tokenServ: TokenService) {
    config.backdrop = 'static';
		config.keyboard = false;
  }
  ngOnInit(): void {
    console.log(this.tokenServ.getClientId())
    if (this.tokenServ.getClientId() === "null") {
      this.listar();
    } else {
      this.listarById();
    }

    this.recargarForm = this.formBuilder.group({
      chanel: ['', [Validators.required]],
      player_id: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(1)]],
      bank_id: ['', [Validators.required]],
      date_hour: ['', [Validators.required]],
      vaucher: ['', [Validators.required]]
    })
  }
  listar() {
    this.clientService.getAll()
    .subscribe({
      next: (res: any) => {
        this.list = res.data
      },
      error: (err: any) => {
       console.log(err)
      },
    })
  }
  listarById() {
    const id = this.tokenServ.getClientId() || '';
    this.clientService.getById(id)
    .subscribe({
      next: (res: any) => {
        this.list = [res.data];
        console.log(this.list)
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
}
