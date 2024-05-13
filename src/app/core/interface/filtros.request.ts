import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap"

export interface Filter {
  fechaIni: NgbDateStruct
  fechaFin: NgbDateStruct
  categoria:string
}