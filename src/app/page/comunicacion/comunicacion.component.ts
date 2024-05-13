import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Filter } from 'src/app/core/interface/filtros.request';
import { Producto } from 'src/app/core/interface/producto.interface';
import { AsesorVentaService } from 'src/app/core/service/asesorVenta.service';
import { DepositService } from 'src/app/core/service/deposit.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { TokenService } from 'src/app/util/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-comunicacion',
  templateUrl: './comunicacion.component.html',
  styleUrls: ['./comunicacion.component.scss']
})
export class ComunicacionComponent implements OnInit{
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
  listBank: any = [];
  mensaje: string = ''
  idJugador: string = ''
  submitted = false;
  asesores: any = []
  comunicationForm: FormGroup;
  responderForm: FormGroup;
  recargarForm: FormGroup;
  roleLogin = this.tokenServ.getRolLogin()
  chanels = [
    {
      id: '1',
      name: "WhatsApp"
    },
    {
      id: '2',
      name: "TeleGram"
    },
    {
      id: '2',
      name: "Messenger"
    }
  ]
  isLoading = false
  isLoadingResponse = false
  idComunication: number = 0
  idClient: number = 0
  archivoSeleccionado: File | null = null;

  constructor(private asesorService: AsesorVentaService, config: NgbModalConfig,
     private formBuilder: FormBuilder, private totastService: NotificationService, 
     private tokenServ: TokenService, private depositoService: DepositService) {
    config.backdrop = 'static';
		config.keyboard = false;
  }
  ngOnInit(): void {
    this.listar();
    this.getAsesores();
    this.bank();
    this.comunicationForm = this.formBuilder.group({
      channel: ['', [Validators.required]],
      id_jugador: ['', [Validators.required]],
      sales_id: ['', [Validators.required]],
      message: ['', [Validators.required]]
    })
    this.responderForm = this.formBuilder.group({
      id: [''],
      client_id: [''],
      sales_id: [this.tokenServ.getSalesId()],
      resMessage: ['', [Validators.required]]
    })
    this.recargarForm = this.formBuilder.group({
      chanel: ['', [Validators.required]],
      player_id: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(1)]],
      bank_id: ['', [Validators.required]],
      date_hour: ['', [Validators.required]],
      vaucher: ['', [Validators.required]]
    })
  }
  getAsesores() {
    this.asesorService.getAll()
    .subscribe({
      next: (res: any) => {
        this.asesores = res.data
      },
      error: (err: any) => {
       console.log(err)
      },
    })
  }
  listar() {
    this.asesorService.getComunicacion()
    .subscribe({
      next: (res: any) => {
        this.list = res.data
      },
      error: (err: any) => {
       console.log(err)
      },
    })
  }
  bank() {
    this.depositoService.getBank()
    .subscribe({
      next: (res: any) => {
        this.listBank = res
      },
      error: (err: any) => {
       console.log(err)
      },
    })
  }
  onSubmit() {
    this.submitted = true
    if (this.comunicationForm.invalid) {
      return;
    }
    const REGISTER = {
      sales_id: this.comunicationForm.get("sales_id")?.value,
      channel: this.comunicationForm.get("channel")?.value,
      message: this.comunicationForm.get("message")?.value,
      id_jugador:  this.comunicationForm.get("id_jugador")?.value,
    }
    this.isLoading = true
    this.asesorService.sendComunicacion(REGISTER).subscribe({
      next: (res: any) => {
        this.totastService.success(res?.message);
        this.comunicationForm.reset();
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
  }
  onResponder () {
    this.submitted = true
    console.log(this.responderForm)
    if (this.responderForm.invalid) {
      alert(20)
      return;
    }
    alert(12)
    const object = {
      id: this.idComunication,
      sales_id: +this.responderForm.get("sales_id")?.value,
      message: this.responderForm.get("resMessage")?.value,
      idClient: +this.idClient
    }
    this.isLoadingResponse = true
    this.asesorService.sendResponder(object).subscribe({
      next: (res: any) => {
        this.totastService.success(res?.message);
        this.responderForm.reset();
        this.modalService.dismissAll();
        this.submitted = false,
        this.isLoadingResponse = false
        this.listar()
      },
      error: (err: any) => {
        this.totastService.error(err?.message);
        this.isLoadingResponse = false
      }
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
  verMensaje (mensaje: string, content: TemplateRef<any>) {
    this.mensaje = mensaje
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }
  verIdJugador (idJugador: string, content: TemplateRef<any>) {
    this.idJugador = idJugador
    this.modalService
    .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
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
  responder (id:number, idClient: number, content: TemplateRef<any>) {
    this.idComunication = id;
    this.idClient = idClient
    this.modalService
    .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    
  }
  recargar (idJugador:string, canal: string, content: TemplateRef<any>) {
    const chanel = canal === '1' ? 'WhatsApp' :  canal === '2' ? 'TeleGram' : 'Messenger'
    this.recargarForm.controls['chanel'].setValue(chanel);
    this.recargarForm.controls['player_id'].setValue(idJugador);
    this.modalService
    .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }
  isRegisterOrUpdate (event: any) {
    this.listar()
    this.modalService.dismissAll();
  }
  onFileSelected(event: any) {
    // Accede al archivo seleccionado
    const archivo: File = event.target.files[0];
    this.archivoSeleccionado = archivo;
    this.recargarForm.controls['vaucher'].setValue(this.archivoSeleccionado);
  }
  recargarCuenta() {
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
      formData.append('date_hour', this.recargarForm.get("date_hour")?.value);
      this.depositoService.recargar(formData).subscribe({
        next: (res: any) => {
          this.totastService.success(res?.message);
          this.responderForm.reset();
          this.modalService.dismissAll();
          this.submitted = false,
          this.isLoadingResponse = false
          this.listar()
        },
        error: (err: any) => {
          this.totastService.error(err?.message);
          this.isLoadingResponse = false
        }
      })
      // Aquí puedes enviar el formData al servidor
      // Por ejemplo:
      // this.miServicio.enviarArchivo(formData).subscribe(...);
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }
  get f() { return this.comunicationForm; }
  get res() { return this.responderForm; }
  get recar() { return this.recargarForm; }
}
