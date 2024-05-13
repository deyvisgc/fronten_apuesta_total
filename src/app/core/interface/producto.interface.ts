export interface Producto {
  id?: number,
  codigoProducto: string;
  nombreProducto: string,
  descripcionProducto: string,
  stockProducto: string,
  precioProducto: number
  categoria: Categoria
}
export interface Categoria {
  id?: number,
  name_cate?: string;
}