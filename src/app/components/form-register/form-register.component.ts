import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthService } from 'src/app/auth/service/auth.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { AsesorVentaService } from 'src/app/core/service/asesorVenta.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit{
  @Input() isClient: boolean = true
  @Output() isSubmit: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  registerForm: FormGroup;
  tipoDocumento = [
    {
      cod: "01",
      desc: "DNI"
    },
    {
      cod: "02",
      desc: "Carnet de Extranjeria"
    },
    {
      cod: "03",
      desc: "Pasaporte"
    }
  ]
  submitted = false;
  error = '';
  successmsg = false;
  returnUrl: string;
  isLoading = false
  isDni = false
  isSearch = false
  lisRole: any = []
  lisDepartamento: any = []
  lisProvincia: any = []
  lisDistrito: any = []
  // set the currenr year
  year: number = new Date().getFullYear();
  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthService, private totastService: NotificationService, 
    private router: Router, private asesorVenta: AsesorVentaService) { }

  ngOnInit() {

    if (!this.isClient) {
        this.role();
    }
    this.depatament()
    this.registerForm = this.formBuilder.group({
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      balance: [''],
      addres: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cod_departament: ['', [Validators.required]],
      cod_province: ['', [Validators.required]],
      cod_district: ['', [Validators.required]],
      role: ['3', [Validators.required]],
    }
    );

    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  changeDocument() {
    if(this.registerForm.get("document_type")?.value === '01') {
      this.isDni = !this.isDni
    }
    if(this.registerForm.get("document_type")?.value === '02') {
      this.isDni = false
    }
    if(this.registerForm.get("document_type")?.value === '03') {
      this.isDni = false
    }

  }
  buscar () {
    
    if (!this.registerForm.get("document_number")?.value) {
      alert("El numero Documento no debe ser nulo")
      return
    }
    if (this.registerForm.get("document_number")?.value.length != 8) {
      alert("El numero Debe tener 8 digitos")
      return
    }
    const numDocumento = this.registerForm.get("document_number")?.value;
    this.isSearch = true;
    this.authenticationService.buscarXNumeroDocumento(numDocumento).subscribe({
        next: (res: any) => {
          console.log(res)
          this.registerForm.controls['name'].setValue(res.nombre_completo);
          this.isDni = false
          // this.f.setValue({'name': res.nombre_completo})
          this.isSearch = false
        },
        error: (err: any) => {
          this.totastService.error(err?.error);
          this.isSearch = false
        }
      })

  }
  role() {
    this.authenticationService.role().subscribe({
      next: (res: any) => {
        this.lisRole = res.filter((f: any) => f.name !== 'CLIENTE' &&  f.name !== 'ADMIN' )
      },
      error: (err: any) => {
        this.totastService.error(err?.message);
      }
    })
  }
  depatament() {
    this.authenticationService.departament().subscribe({
      next: (res: any) => {
        this.lisDepartamento = res.data
      },
      error: (err: any) => {
        this.totastService.error(err?.message);
      }
    })
  }
  province() {
    const idDepartament = `0${this.registerForm.get("cod_departament")?.value}`;
    this.authenticationService.provincia(idDepartament).subscribe({
      next: (res: any) => {
        this.lisProvincia = res.data
      },
      error: (err: any) => {
        this.totastService.error(err?.message);
      }
    })
  }
  distrito() {
    const idProvincia = `0${this.registerForm.get("cod_province")?.value}`;

    this.authenticationService.distrito(idProvincia).subscribe({
      next: (res: any) => {
        this.lisDistrito = res.data
      },
      error: (err: any) => {
        this.totastService.error(err?.message);
      }
    })
  }
  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      return;
    }

    const REGISTER = {
      document_type: this.registerForm.get("document_type")?.value,
      document_number: this.registerForm.get("document_number")?.value,
      name: this.registerForm.get("name")?.value,
      phone:  this.registerForm.get("phone")?.value,
      balance: this.registerForm.get("balance")?.value || 20.00,
      addres: this.registerForm.get("addres")?.value,
      email: this.registerForm.get("email")?.value,
      password: this.registerForm.get("password")?.value,
      cod_departament: `0${this.registerForm.get("cod_departament")?.value}`,
      cod_province: `0${this.registerForm.get("cod_province")?.value}`,
      cod_district: `0${this.registerForm.get("cod_district")?.value}`,
      role: this.registerForm.get("role")?.value,
    }

    if (this.isClient) {
      this.authenticationService.registerAndLogin(REGISTER).subscribe({
        next: (res: any) => {
          this.router.navigate(['/page/welcome']);
          this.totastService.success(res?.message);
          this.registerForm.reset();
          this.submitted = false
        },
        error: (err: any) => {
          this.totastService.error(err?.message);
        },
        complete: () => {
          console.log("finis")
        },
      })
    } else {
      this.asesorVenta.register(REGISTER).subscribe({
        next: (res: any) => {
          this.totastService.success(res?.message);
          this.registerForm.reset();
          this.submitted = false
          this.isSubmit.emit(true)
        },
        error: (err: any) => {
          this.totastService.error(err?.message);
        },
        complete: () => {
          console.log("finis")
        },
      })
    }
  }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm; }
}
