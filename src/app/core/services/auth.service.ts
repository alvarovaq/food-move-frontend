import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseModel } from '../models/auth-response.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { RouterService } from './router.service';
import { EmployeesService } from './employees.service';
import { AuthRequestModel } from '../models/auth-request.model';
import { environment } from 'src/environments/environment';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userLogged = new BehaviorSubject<EmployeeModel | null>(null);
    public user$: Observable<EmployeeModel | null> = this.userLogged;

    constructor (
        private readonly http: HttpClient,
        private readonly routerService: RouterService,
        private readonly employeesService: EmployeesService
    ) {}

    getNewToken (user: AuthRequestModel): Observable<AuthResponseModel> {
        return this.http.post<AuthResponseModel>(`${environment.api}/auth/login`, user);
    }

    setSession (): void {
        const myUser = this.userLogged.getValue();
        if (!myUser && this.isLogin()) {
            this.employeesService.getEmployeeByEmail(this.email!)
            .subscribe(
                res => {
                    this.userLogged.next(res);
                },
                err => {
                    console.log(err);
                    this.logout();
                }
            )
        }
    }

    login (authResponse: AuthResponseModel): void {
        this.setToken(authResponse.token);
        this.setEmail(authResponse.user.email);
        this.routerService.goToPatients();
        this.setSession();
    }

    logout (): void {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.routerService.goToLogin();
        this.userLogged.next(null);
    }

    isLogin (): boolean {
        if (this.token) return true;
        return false;
    }

    isAdmin (): boolean {
        const myUser = this.userLogged.getValue();
        return myUser ? myUser.admin : false;
    }

    get token (): string | null {
        return localStorage.getItem('token');
    }
    
    setToken (token: string): void {
        localStorage.setItem('token', token);
    }

    get email (): string | null {
        return localStorage.getItem('email');
    }

    setEmail (email: string): void {
        localStorage.setItem('email', email);
    }

}