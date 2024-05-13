import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Filter } from 'src/app/core/interface/filtros.request';
import { Producto } from 'src/app/core/interface/producto.interface';
import { AsesorVentaService } from 'src/app/core/service/asesorVenta.service';
import { DepositService } from 'src/app/core/service/deposit.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.scss']
})
export class RecargaComponent {
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
  constructor(private asesorService: AsesorVentaService, private formBuilder: FormBuilder,
     config: NgbModalConfig, private depositService: DepositService, private totastService: NotificationService) {
    config.backdrop = 'static';
		config.keyboard = false;
  }
  ngOnInit(): void {
    this.listar();
    this.recargarForm = this.formBuilder.group({
      chanel: ['', [Validators.required]],
      player_id: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(1)]],
      bank_id: ['', [Validators.required]],
      date_hour: ['', [Validators.required]],
      vaucher: ['', [Validators.required]]
    })
    this.bank()
  }
  listar() {
    this.depositService.getAll()
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
  edit($id: string, content: TemplateRef<any>) {
    this.idRecarga = $id
    this.depositService.getById($id).subscribe({
      next: (res: any) => {
        this.recargarForm.controls['chanel'].setValue(res?.data.canal);
        this.recargarForm.controls['player_id'].setValue(res?.data.player_id);
        this.recargarForm.controls['monto'].setValue(res?.data.monto);
        this.recargarForm.controls['date_hour'].setValue(res?.data.fechaHora);
        this.recargarForm.controls['vaucher'].setValue(res?.data.voucher);
        this.recargarForm.controls['bank_id'].setValue(res?.data.id_bank);
        this.modalService
             .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
        console.log(res)     
      },
      error: (err: any) => {
       console.log(err)
      },
    })

  }
  isRegisterOrUpdate (event: any) {
    this.listar()
    this.modalService.dismissAll();
  }
  bank() {
    this.depositService.getBank()
    .subscribe({
      next: (res: any) => {
        this.listBank = res
      },
      error: (err: any) => {
       console.log(err)
      },
    })
  }
  updaterecargaCuenta() {
    this.submitted = true
    if (this.recargarForm.invalid) {
      return;
    }
    if (this.archivoSeleccionado) {
      const formData = new FormData();
      formData.append('voucher', this.archivoSeleccionado, this.archivoSeleccionado.name);
      formData.append('chanel', this.recargarForm.get("chanel")?.value);
      formData.append('player_id', this.recargarForm.get("player_id")?.value);
      formData.append('amount', this.recargarForm.get("monto")?.value);
      formData.append('bank_id', this.recargarForm.get("bank_id")?.value);
      formData.append('date_hour', this.recargarForm.get("date_hour")?.value);
      this.isLoading = true
      this.depositService.updateRecargar(this.idRecarga, formData).subscribe({
        next: (res: any) => {
          this.totastService.success(res?.message);
          this.recargarForm.reset();
          this.modalService.dismissAll();
          this.submitted = false,
          this.isLoading = false
          this.listar()
        },
        error: (err: any) => {
          this.totastService.error(err?.message);
          this.isLoading = false
        }
      })
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }
  onFileSelected(event: any) {
    // Accede al archivo seleccionado
    const archivo: File = event.target.files[0];
    this.archivoSeleccionado = archivo;
    this.recargarForm.controls['vaucher'].setValue(this.archivoSeleccionado);
  }
  get recar() { return this.recargarForm; }
}
