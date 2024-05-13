import { environment } from "src/environments/environment"
export class UriConstante {
  public static readonly LOGIN = environment.API_BASE_URL + "auth/login";
  public static readonly LOGOUT = environment.API_BASE_URL + "auth/logout";
  public static readonly BUSCAR_DOCUMENTO = environment.API_BASE_URL + "clients/search-document/{numDocument}";
  public static readonly ROLE = environment.API_BASE_URL + "general/role";
  public static readonly DEPARTAMENTO = environment.API_BASE_URL + "ubigeo/departament";
  public static readonly PROVINCIA = environment.API_BASE_URL + "ubigeo/province/{idDepar}";
  public static readonly DISTRITO = environment.API_BASE_URL + "ubigeo/distrito/{idProv}";
  public static readonly REGISTER_CLIENT = environment.API_BASE_URL + "clients/";
  public static readonly LISTAR_ASESORES_VENTAS = environment.API_BASE_URL + "sales/";
  public static readonly REGISTER_ASESORES_VENTAS = environment.API_BASE_URL + "sales/";
  public static readonly LISTAR_COMUNICACIONES = environment.API_BASE_URL + "general/comunication/list";
  public static readonly CREATE_COMUNICACIONES = environment.API_BASE_URL + "general/comunication";
  public static readonly CREATE_RESPONDER = environment.API_BASE_URL + "general/comunication/reply";
  public static readonly OBTENER_BANCO = environment.API_BASE_URL + "general/bank";
  public static readonly RECARGAR_CUENTA = environment.API_BASE_URL + "deposit/recargar";
  public static readonly UPDATE_RECARGAR_CUENTA = environment.API_BASE_URL + "deposit/recargar/{id}";

  public static readonly LISTAR_DEPOSITOS = environment.API_BASE_URL + "deposit/list";
  public static readonly LISTAR_DEPOSITOS_BY_ID = environment.API_BASE_URL + "deposit/list/{id}";
  public static readonly LISTAR_CLIENTES = environment.API_BASE_URL + "clients";


  // public static readonly ROLE = environment.API_BASE_URL + "/role"
  
  // public static readonly FAMILY_RESOURCE = environment.API_BASE_URL + "/family"
  // public static readonly FAMILY_RESOURCE_DESCARGAR_ECXEL = environment.API_BASE_URL + "/family/export/excel"
  // public static readonly FAMILY_RESOURCE_DESCARGAR_PDF = environment.API_BASE_URL + "/family/export/pdf"
  // public static readonly LINEA_RESORCE = environment.API_BASE_URL + "/linea"
  // public static readonly LINEA_FAMILIA_RESORCE = environment.API_BASE_URL + "/linea/linea-familia"
  // public static readonly GRUPO_RESORCE = environment.API_BASE_URL + "/group"
  // public static readonly GRUPO_LINEA_RESORCE = environment.API_BASE_URL + "/group/grupo-linea"
  // public static readonly PRODUCTO_RESORCE = environment.API_BASE_URL + "/products"
}
