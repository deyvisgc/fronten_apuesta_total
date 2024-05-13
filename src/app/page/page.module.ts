import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './product/product.component';
import { ComponentModule } from '../components/components.module';
import { AdminComponent } from './admin/admin.component';
import { CoreModule } from '../core/core.module';
import { ComunicacionComponent } from './comunicacion/comunicacion.component';
import { RecargaComponent } from './recarga/recarga.component';
import { ClientComponent } from './client/client.component';
import { WelcomeComponent } from './welcome/welcome.component';
const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'asesor',
    component: AdminComponent
  },
  {
    path: 'comunicacion',
    component: ComunicacionComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'client',
    component: ClientComponent
  },
  {
    path: 'recarga',
    component: RecargaComponent
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // RouterModule.forChild(ComponentsRoutes),
    NgbTooltipModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ComponentModule,
    NgbAlertModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbAccordionModule,
    CoreModule

  ],
  declarations: [
    ProductComponent,
    AdminComponent,
    ComunicacionComponent,
    RecargaComponent,
    ClientComponent,
    WelcomeComponent
  ],
})
export class PageModule {}
