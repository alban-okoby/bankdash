import { Routes } from '@angular/router';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { AccountComponent } from './pages/account/account.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { MyassurancesComponent } from './pages/myassurances/myassurances.component';
import { DevicesExchangesComponent } from './pages/devices-exchanges/devices-exchanges.component';
import { MycardsComponent } from './pages/mycards/mycards.component';
import { PersonnalFinancesComponent } from './pages/personnal-finances/personnal-finances.component';
import { Routes  as StaticRoute }  from './core/routes/routes';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { SendMoneyComponent } from './pages/send-money/send-money.component';
import { ServicesComponent } from './pages/services/services.component';
import { LoansComponent } from './pages/loans/loans.component';
import { PrivilegesComponent } from './pages/privileges/privileges.component';
import { NoAuthNeedGuard } from './auth/guard/logged.guard';

const staticRoutes : StaticRoute = new StaticRoute();
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: DashbordComponent,
        data: { title: 'Tableau de bord' }, title: 'Tableau de bord'
      },
      {
        path: staticRoutes.MY_TRANSACTIONS.path, 
        component: SendMoneyComponent,
        data: { title: 'Mes transactions' }, title: 'Mes transactions'
      },
      {
        path: staticRoutes.INVESTMENTS.path, component: MyassurancesComponent,
        data: { title: 'Investissements' }, title: 'Investissements'
      },
      {
        path: staticRoutes.LOANS.path, component: LoansComponent,
        data: { title: 'Credits' }, title: 'Credits'
      },
      {
        path: staticRoutes.MY_ACCOUNTS.path, component: AccountComponent,
        data: { title: 'Mes comptes' }, title: 'Mes comptes'
      },
      {
        path: staticRoutes.MY_CARDS.path, component: MycardsComponent,
        data: { title: 'Mes cartes' }, title: 'Mes cartes'
      },
      {
        path: staticRoutes.SERVICES.path, component: ServicesComponent,
        data: { title: 'Services' }, title: 'Services'
      },
      {
        path: staticRoutes.MY_PRIVILEGES.path, component: PrivilegesComponent,
        data: { title: 'Privilèges' }, title: 'Privilèges'
      },
      {
        path: staticRoutes.MY_PROFILE.path, component: MyprofileComponent, 
        data: { title: 'Mon profil' }, title: 'Mon profil'
      },
    ]
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.routes),
    title: 'BankDahsh - Authentification'
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];
