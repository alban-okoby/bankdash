import { inject } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { StaticRoutes, UsersService } from "../../core";

export class NoAuthNeedGuard implements CanActivate {
  private routes: StaticRoutes = new StaticRoutes();
  logged: boolean = false;
  constructor(private router: Router, private userService: UsersService) {}

  canActivate(): boolean {
    if (this.logged) {
      window.location.reload();
      setTimeout(() => {
        this.router.navigate(['/business/mytransactions']);
      }, 1000);
      return false;
    }
    return true;
  }

  tryToGetUserInfos() {
    this.userService.currentUser().subscribe((res: any) => {
      if (res.status == 200) {
        this.logged = true;
      }
    });
  }
}
