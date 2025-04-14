export class Routes {

  private id!: any;
  private basePath: string = '';

  // AUTH PAGES
  private auth = '/auth';
  AUTH_SIGN_UP: string = `${this.auth}/signup`;
  AUTH_SIGN_IN: string = `${this.auth}/signin`;
  AUTH_RESET_PASSWORD: string = `${this.auth}/reset-password`;

  // PRINCIPAL PAGES
  DASHBOARD: string = `${this.basePath}`;
  BUSINESS: string = `business`;

  MY_TRANSACTIONS: any = {
    path: `${this.BUSINESS}/mytransactions`,
    route: `/${this.BUSINESS}/mytransactions`
  };

  MY_ACCOUNTS: any = {
    path: `${this.BUSINESS}/myaccounts`,
    route: `/${this.BUSINESS}/myaccounts`
  };

  INVESTMENTS: any = {
    path: `${this.BUSINESS}/investiments`,
    route: `/${this.BUSINESS}/investiments`
  };

  MY_CARDS: any = {
    path: `${this.BUSINESS}/mycards`,
    route: `/${this.BUSINESS}/mycards`
  };

  LOANS: any = {
    path: `${this.BUSINESS}/loans`,
    route: `/${this.BUSINESS}/loans`
  };

  SERVICES: any = {
    path: `${this.BUSINESS}/services`,
    route: `/${this.BUSINESS}/services`
  };

  MY_PRIVILEGES: any = {
    path: `${this.BUSINESS}/privileges`,
    route: `/${this.BUSINESS}/privileges`
  };

  DEVISES_EXCHANGES: any = {
    path: `${this.BUSINESS}/devises-exchanges`,
    route: `/${this.BUSINESS}/devises-exchanges`
  };

  MY_PROFILE: any = {
    path: `profile`,
    route: `/profile`
  };

  ERROR_404: any = {
    path: `error/not-found`,
    route: `/error/not-found`
  };

}