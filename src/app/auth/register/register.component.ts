import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComponentModule } from 'src/app/components/components.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule, ComponentModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  tipoDocumento = [
    {
      cod: "01",
      name: "DNI"
    },
    {
      cod: "02",
      name: "Carnet de Extranjeria"
    },
    {
      cod: "03",
      name: "Pasaporte"
    }
  ]
  submitted = false;
  error = '';
  successmsg = false;
  returnUrl: string;
  isLoading = false
  // set the currenr year
  year: number = new Date().getFullYear();
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authenticationService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      balance: [''],
      addres: ['', [Validators.required]],
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
  


}
