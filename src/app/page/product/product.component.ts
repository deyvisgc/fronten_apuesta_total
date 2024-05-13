import { Component, Input, Signal, TemplateRef, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ListPage } from 'src/app/core/interface/list.';
import { NotificationService } from 'src/app/core/service/notification.service';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { ProductoService } from '../../core/service/producto.service';
import { Filter } from 'src/app/core/interface/filtros.request';
import { Producto } from 'src/app/core/interface/producto.interface';

@Component({
  selector: 'app-product',
  // standalone: true,
  // imports: [RouterModule, FilterComponent, FormComponent, ListComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  private modalService = inject(NgbModal);
  filters: Filter
  closeResult = '';
  filterValue = '';
  list: ListPage;
  selectedCar: number;
  formForm: FormGroup;
  formFormUpdate: FormGroup;
  submitted = false;
  isLoading = false;
  totalRegistros = 0;
  totalRegistroPage = 0;
  limit = 10;
  offset = 0;
  currentPage: number = 1;
  totalPages: number = 1;
  textSearch: string = '';
  errors: any[] = [];
  idFamilia: number;
  permisos: any[] = []
  isRegistrar: boolean = true
  isActualizar: boolean = true
  isEliminar: boolean = true
  isSubmit: boolean

  categoria = [
    {
      cate_name: "Limpieza",
      id_cate: 1
    },
    {
      cate_name: "Alimentos",
      id_cate: 2
    }
  ]
  isCollapsed = true;
  constructor(
    private productService: ProductoService,
    private formBuilder: FormBuilder,
    private totastService: NotificationService,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
		config.keyboard = false;
    //this.obtenerPermisos()
  }
  ngOnInit(): void {
    this.getList(0, 10);
  }
  getFilters(event: any) {
    this.filters = event
  }
  isUpdate(event: any) {
    this.productService.setFormUpdate(event)
  }
  clearFilter() {
    // this.filtros = {
    //   categoria: '',
    //   fecha_ini: {
    //     year: dayjs().subtract(1, 'month').year(),
    //     month: dayjs().subtract(1, 'month').month() + 1, // Los meses en NgbDateStruct van de 1 a 12
    //     day: dayjs().date(),
    //   },
    //   fecha_fin: {
    //     year: dayjs().year(),
    //     month: dayjs().month() + 1,
    //     day: dayjs().date(),
    //   },
    // };
    this.getList(this.limit, this.currentPage);
  }
  onSearchDate() {
    // if (!this.filtros.fecha_ini) {
    //   this.totastService.warning('La fecha Inicio no debe estar vacio');
    //   return;
    // }
    // if (!this.filtros.fecha_fin) {
    //   this.totastService.warning('La fecha Fin no debe estar vacio');
    //   return;
    // }
    this.getList(this.limit, this.currentPage);
  }
  onSearchResponsable() {
    // if (!this.filtros.categoria) {
    //   this.totastService.warning('Debe seleccionar un responsable');
    //   return;
    // }
    // this.getList(this.limit, this.currentPage);
  }
  inicializarFormulario() {
    this.formForm = this.formBuilder.group({
      familias: this.formBuilder.array([]),
    });
    this.formFormUpdate = this.formBuilder.group({
      descripcion_familia: ['', Validators.required],
      codigo_familia: ['', Validators.required],
    });
  }
  get familias() {
    return this.formForm.get('familias') as FormArray;
  }
  eliminarFamilia(index: number) {
    this.familias.removeAt(index);
  }
  guardar() {
    // if (this.familias.length == 0) {
    //   this.totastService.error("Se requiere minimo 1 familia para registrar")
    //   return
    // }
    // this.submitted = true;
    // if (this.formForm.invalid) {
    //   return;
    // }
    // this.isLoading = true
    // const datosFamilias = this.formForm.value.familias as FamiliaRequest[];

  }
  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }
  getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.BACKDROP_CLICK:
        this.familias.clear()
        this.modalService.dismissAll();
        this.errors = []
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  private getFamily() {
    this.getList(this.limit, this.currentPage);
  }
  onPageChange(event: { page: number; limit: number; offset: number }): void {
    this.currentPage = event.page;
    this.getList(event.limit, this.currentPage);
  }
  async getList(size: number, page: number): Promise<void>  {
    //  const response = await firstValueFrom(this.productService.getAll(page, size, {}));
    //  this.list = response

  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  eliminar(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Seguro de Eliminar Esta Familia?',
        text: `¡No podrás revertir esto!?`,
        icon: 'warning',
        confirmButtonText: `Si, Eliminar!`,
        cancelButtonText: 'No, cerrar!',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          // this.productService.delete(id).subscribe({
          //   next: (res: any) => {
          //     this.totastService.success(res.message);
          //   },
          //   error: (err: any) => {
          //     if (err.statusCode === 409) {
          //       this.totastService.error(err.error);
          //     } else {
          //       this.totastService.error(err.message);
          //     }
          //   },
          //   complete: () => {
          //     this.getFamily();
          //   },
          // });
        }
      });
  }
  edit(model: any, id: number) {
    this.productService.getById(id).subscribe({
      next: (res: any) => {
        this.formFormUpdate.patchValue({
          descripcion_familia: res.des_fam,
          codigo_familia: res.cod_fam,
        });
        this.idFamilia = res.id_fam;
        this.modalService.open(model);
      },
      error: (err: any) => {
        this.totastService.error(err.error.error);
      },
    });
  }
  get f() {
    return this.formFormUpdate;
  }
  update() {
    this.submitted = true;
    if (this.formFormUpdate.invalid) {
      return;
    }
    this.isLoading = true
    this.productService
      .update(this.idFamilia, this.formFormUpdate.value)
      .subscribe({
        next: (res: any) => {
          this.totastService.success(res.message);
          this.formFormUpdate.reset();
          this.modalService.dismissAll();
          this.errors = [];
          this.isLoading = false
        },
        error: (err: any) => {
          this.totastService.error(err.error);
          this.isLoading = false
        },
        complete: () => {
          this.submitted = false;
          this.getFamily();
        },
      });
  }
  isRegisterOrUpdate (event: any) {
    this.productService.saveStatus(event)
  }
}
