export class Routes {

  private id!: any;
  private basePath: string = '';

  // AUTH PAGES
  private auth = '/auth';
  AUTH_SIGN_UP:string = `${this.auth}/signup`;
  AUTH_SIGN_IN:string = `${this.auth}/signin`;
  AUTH_RESET_PASSWORD:string = `${this.auth}/reset-password`;

  // PRINCIPAL PAGES
  DASHBOARD: string = `${this.basePath}`;
  BUSINESS: string = `business`;
  MY_ACCOUNTS: string = `myaccounts`;
  MY_ACCOUNTS_SEND_MONEY: string = `${this.BUSINESS}/${this.MY_ACCOUNTS}/send-money`;
  MY_ASSURANCES: string = `${this.BUSINESS}/myassurances`
  MY_CARDS: string = `${this.BUSINESS}/mycards`;
  MY_FINANCES: string = `${this.BUSINESS}/finances`
  DEVISES_EXCHANGES: string = `${this.BUSINESS}/devises-exchanges`
  MY_PROFILE: string = `profile`
  ERROR_404: string = `error/not-found`;
}
