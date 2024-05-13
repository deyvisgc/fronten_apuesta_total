import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipe/search.pipe';
import { NumberOnlyDirective } from './directive/number-only.directive';
import { NumberDecimalsDirective } from './directive/number-decimals.directive';


@NgModule({
  declarations: [SearchPipe, NumberOnlyDirective, NumberDecimalsDirective],
  imports: [
    CommonModule,
  ],
  exports: [SearchPipe, NumberOnlyDirective, NumberDecimalsDirective]
})
export class CoreModule { }
