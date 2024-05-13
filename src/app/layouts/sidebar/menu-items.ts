import { RouteInfo } from './sidebar.metadata';
const rolePublicAll = ["Super Admin", "Gerente OP", "Comercial"]
const rolePrivate = ["Super Admin", "Gerente OP"]
export const ROUTES: RouteInfo[] = [
 
  {
    path: '/page/asesor',
    title: 'Asesores de Ventas',
    icon: 'fas fa-box',  
    class: '',
    extralink: false,
    role: rolePublicAll,
    submenu: []
  },
  {
    path: '/page/client',
    title: 'Clientes',
    icon: 'fa-solid fa-users',
    class: '',
    extralink: false,
    role: rolePrivate,
    submenu: []
  },
  {
    path: '/page/comunicacion',
    title: 'Comunicaciòn',
    icon: 'fa-solid fa-users',
    class: '',
    extralink: false,
    role: rolePrivate,
    submenu: []
  },
  {
    path: '/page/recarga',
    title: 'Recargas',
    icon: 'fa-solid fa-users',
    class: '',
    extralink: false,
    role: rolePrivate,
    submenu: []
  },
  {
    path: '/system/component/admin',
    title: 'Historial de Recargas',
    icon: 'fa-solid fa-users',
    class: '',
    extralink: false,
    role: rolePrivate,
    submenu: []
  },
  {
    path: '',
    title: 'Cerrar Session',
    icon: 'fas fa-sign-out-alt',
    role: rolePublicAll,
    class: '',
    extralink: false,
    submenu: []
  }
];
