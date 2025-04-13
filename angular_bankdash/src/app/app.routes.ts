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
        path: staticRoutes.MY_ACCOUNTS, component: AccountComponent,
        data: { title: 'Mes comptes' }, title: 'Mes comptes'
      },
      {
        path: staticRoutes.MY_ACCOUNTS_SEND_MONEY, component: SendMoneyComponent,
        data: {title: 'Envoyer de l\'argent'}, title: 'Envoyer de l\'argent'
      }, 
      {
        path: staticRoutes.MY_ASSURANCES, component: MyassurancesComponent,
        data: { title: 'Mes assurances' }, title: 'Mes assurances'
      },
      {
        path: staticRoutes.MY_CARDS, component: MycardsComponent,
        data: { title: 'Mes cartes' }, title: 'Mes cartes'
      },
      {
        path: staticRoutes.MY_FINANCES, component: PersonnalFinancesComponent,
        data: { title: 'Finances personnelles' }, title: 'Finances personnelles'
      },
      {
        path: staticRoutes.DEVISES_EXCHANGES, component: DevicesExchangesComponent,
        data: { title: 'Devises & Changes' }, title: 'Devises & Changes'
      },
      {
        path: staticRoutes.MY_PROFILE, component: MyprofileComponent, 
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
