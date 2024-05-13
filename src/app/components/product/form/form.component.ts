import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ResponseMessage } from 'src/app/core/interface/message.response';
import { Categoria, Producto } from 'src/app/core/interface/producto.interface';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ProductoService } from 'src/app/core/service/producto.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() isSubmit: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  private modalService = inject(NgbModal);
  title: string = 'Crear Producto';
  signupForm: FormGroup;
  submitted = signal(false)
  isLoading = signal(false)
  categoria: Categoria[] =  [
    {
      id: 1,
      name_cate: "Limpieza"
    },
    {
      id: 1,
      name_cate: "Alimentacion"
    }
  ]
  product: Producto
  constructor(
    private formBuilder: FormBuilder,
    private totastService: NotificationService,
    config: NgbModalConfig,
    private productService: ProductoService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.obserbableOpertator()
    this.signupForm = this.formBuilder.group({
      nombreProducto: [null, [Validators.required]],
      codigoProducto: [null, [Validators.required]],
      categoria: [1, [Validators.required]],
      precioProducto: ['0.00', [Validators.required, Validators.min(1)]],
      stockProducto: ['0', [Validators.required, Validators.min(1)]],
      descripcionProducto: [null, [Validators.required]],
    });
  }
  getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.BACKDROP_CLICK:
        this.modalService.dismissAll();
        this.signupForm.reset();
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  onSubmit() {
    this.submitted.set(true);
    if (this.signupForm.invalid) {
      return;
    }
    this.product = {
      nombreProducto: this.signupForm.get("nombreProducto")?.value,
      codigoProducto: this.signupForm.get("codigoProducto")?.value,
      descripcionProducto: this.signupForm.get("descripcionProducto")?.value,
      precioProducto: this.signupForm.get("precioProducto")?.value,
      stockProducto: this.signupForm.get("stockProducto")?.value,
      categoria : { id: this.signupForm.get("categoria")?.value}
    }
    this.productService.register(this.product).subscribe({
      next: (res: ResponseMessage) => {
        this.totastService.success(res?.message);
        this.signupForm.reset();
        this.modalService.dismissAll();
        this.isSubmit.emit(true)
      },
      error: (err: any) => {
        this.totastService.error(err?.message);
        console.log(err)
        this.modalService.dismissAll();
      },
      complete: () => {
        console.log("finis")
      },
    })
  }
  get f() {
    return this.signupForm;
  }
  obserbableOpertator() {
    this.productService.isFormUpdate$.subscribe({
      next: (res: Producto) => {
        console.log("response: ", res)
      }
    })
  }
}
