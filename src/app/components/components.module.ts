import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './product/filter/filter.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormComponent } from './product/form/form.component';
import { ListComponent } from './product/list/list.component';
import { NgbAccordionModule, NgbAlertModule, NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreModule } from '../core/core.module';
import { FormRegisterComponent } from './form-register/form-register.component';

@NgModule({
  declarations: [
    FilterComponent,
    PaginationComponent,
    FormComponent,
    ListComponent,
    FormRegisterComponent
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbAlertModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbAccordionModule,
    CoreModule
  ],

  exports: [
    FilterComponent,
    PaginationComponent,
    FormComponent,
    ListComponent,
    FormRegisterComponent
  ],
})
export class ComponentModule { }
