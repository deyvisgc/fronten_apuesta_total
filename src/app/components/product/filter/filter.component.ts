import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from 'dayjs';
import { Filter } from 'src/app/core/interface/filtros.request';
import { Categoria } from 'src/app/core/interface/producto.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{
  isCollapsed = true;
  @Output() filters: EventEmitter<Filter> = new EventEmitter<Filter>();
  today = inject(NgbCalendar).getToday();
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
  filter: Filter = {
    fechaIni: {
      year: dayjs().subtract(1, 'month').year(),
      month: dayjs().subtract(1, 'month').month() + 1, // Los meses en NgbDateStruct van de 1 a 12
      day: dayjs().date(),
    },

    fechaFin: {
      year: dayjs().year(),
      month: dayjs().month() + 1,
      day: dayjs().date(),
    },

    categoria: ''
  }
  model: NgbDateStruct;
  ngOnInit(): void {
    this.filters.emit(this.filter)
  }
  clearFilter() {
  }
  onSearchDate() {
  }
  onSearchFamily () {}
}
