import { Producto } from "./producto.interface"

export interface ListPage {
  limit?: number,
  offset?: number,
  totalPages: number,
  totalElements: number
  size: number
  content: Producto
}