//LOGIN
import Login from "./views/login/login.component";
//PAGE 404
import Page404 from "./views/404/404-page.component";
//DASHBOARD
import Dashboard from "./views/dashboard/dashboard.component";
//CLIENTES
import Clientes from "./views/clientes/clientes-dashboard.component";
import CadastrarCliente from "./views/clientes/cadastrar/cadastrar.component";
import ListarClientes from "./views/clientes/listar/listar.component";
import EditarClientes from "./views/clientes/editar/editar.component";
//SERVICOS
import Servicos from "./views/servicos/servicos-dashboard.component";
import CadastrarServico from "./views/servicos/steps/steps.component";
import ListarServicoAgendado from "./views/servicos/listarAgendados/listar.component";
import ListarServicoFeito from "./views/servicos/listarFeitos/listar.component";
import EditarServico from "./views/servicos/editar/editar.component";
//TIPOS DE SERVICOS
import TiposServicos from "./views/tipoServicos/tipoServicos-dashboard.component";
import CadastrarTiposServicos from "./views/tipoServicos/cadastrar/cadastrar.component";
import ListarTiposServicos from "./views/tipoServicos/listar/listar.component";
import EditarTiposServicos from "./views/tipoServicos/editar/editar.component";
//PRESTADORES
import Prestadores from "./views/prestadores/prestadores-dashboard.component";
import CadastrarPrestadores from "./views/prestadores/cadastrar/cadastrar.component";
import ListarPrestadores from "./views/prestadores/listar/listar.component";
import EditarPrestadores from "./views/prestadores/editar/editar.component";
//ADMIN
import Administrador from "./views/admin/admin-dashboard.component";
import CadastrarAdministrador from "./views/admin/cadastrar/cadastrar.component";
import ListarAdministrador from "./views/admin/listar/listar.component";
import EditarAdministrador from "./views/admin/editar/editar.component";

/*
import Icons from "views/Icons.jsx";
import Notifications from './views/Notifications';

*/

var routes = [
  {
    path: "login",
    name: "Login",
    icon: "tim-icons icon-bank",
    component: Login,
    layout: "/",
    main: false,
    admin: false,
  },
  {
    path: "404",
    name: "404",
    icon: "tim-icons icon-bank",
    component: Page404,
    layout: "/",
    main: false,
    admin: false
  },
  {
    path: "/dashboard",
    name: "Painel de Controle",
    icon: "tim-icons icon-bank",
    component: Dashboard,
    layout: "/admin",
    main: true,
    admin: false
  },
  {
    path: "/clientes/dashboard",
    name: "Clientes",
    icon: "tim-icons icon-istanbul",
    component: Clientes,
    layout: "/admin",
    main: true,
    admin: false
  },
  {
    path: "/cliente/cadastrar",
    name: "Cadastrar Clientes",
    icon: "tim-icons icon-istanbul",
    component: CadastrarCliente,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/clientes/listar",
    name: "Listar Clientes",
    icon: "tim-icons icon-istanbul",
    component: ListarClientes,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/cliente/editar",
    name: "Editar Clientes",
    icon: "tim-icons icon-istanbul",
    component: EditarClientes,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/servicos/dashboard",
    name: "Servicos",
    icon: "tim-icons icon-scissors",
    component: Servicos,
    layout: "/admin",
    main: true,
    admin: false
  },
  {
    path: "/servico/cadastrar",
    name: "Cadastrar Servicos",
    icon: "tim-icons icon-scissors",
    component: CadastrarServico,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/servicos/listarAgendados",
    name: "Servicos Agendados",
    icon: "tim-icons icon-scissors",
    component: ListarServicoAgendado,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/servicos/listarFeitos",
    name: "Servicos Feitos",
    icon: "tim-icons icon-scissors",
    component: ListarServicoFeito,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/servico/editar",
    name: "Editar Servicos",
    icon: "tim-icons icon-scissors",
    component: EditarServico,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/prestadores/dashboard",
    name: "Prestadores",
    icon: "tim-icons icon-single-02",
    component: Prestadores,
    layout: "/admin",
    main: true,
    admin: false
  },
  {
    path: "/prestador/cadastrar",
    name: "Cadastrar Prestador",
    icon: "tim-icons icon-single-02",
    component: CadastrarPrestadores,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/prestadores/listar",
    name: "Listar Prestador",
    icon: "tim-icons icon-istansingle-02bul",
    component: ListarPrestadores,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/prestador/editar",
    name: "Editar Prestador",
    icon: "tim-icons icon-single-02",
    component: EditarPrestadores,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/tipoServicos/dashboard",
    name: "Tipos de Serviços",
    icon: "tim-icons icon-basket-simple",
    component: TiposServicos,
    layout: "/admin",
    main: true,
    admin: false
  },
  {
    path: "/tipoServico/cadastrar",
    name: "Cadastrar Tipo de Serviço",
    icon: "tim-icons icon-basket-simple",
    component: CadastrarTiposServicos,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/tipoServicos/listar",
    name: "Listar Tipos de Serviços",
    icon: "tim-icons icon-basket-simple",
    component: ListarTiposServicos,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/tipoServico/editar",
    name: "Editar Tipo de Serviço",
    icon: "tim-icons icon-basket-simple",
    component: EditarTiposServicos,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/usuario/dashboard",
    name: "Administradores",
    icon: "tim-icons icon-basket-simple",
    component: Administrador,
    layout: "/admin",
    main: false,
    admin: true
  },
  {
    path: "/usuario/cadastrar",
    name: "Cadastrar Administrador",
    icon: "tim-icons icon-basket-simple",
    component: CadastrarAdministrador,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/usuario/listar",
    name: "Listar Administradores",
    icon: "tim-icons icon-basket-simple",
    component: ListarAdministrador,
    layout: "/admin",
    main: false,
    admin: false
  },
  {
    path: "/usuario/editar",
    name: "Editar Administrador",
    icon: "tim-icons icon-basket-simple",
    component: EditarAdministrador,
    layout: "/admin",
    main: false,
    admin: false
  },
  /* 
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
    main: true,
  },


    {
      path: "/icons",
      name: "Icons",
      icon: "tim-icons icon-atom",
      component: Icons,
      layout: "/admin",
      main: true,

  }
*/
];

export default routes;
