import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../models/auth-response';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '@shared/constants';
import { RouterService } from './router.service';
import { EmployeesService } from './employees.service';
import { AuthRequest } from '../models/auth-request';
import { finalize } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor (
        private readonly http: HttpClient,
        private readonly routerService: RouterService,
        private readonly employeesService: EmployeesService
    ) {}

    getNewToken (user: AuthRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${API_ENDPOINT}/auth/login`, user);
    }

    setSession (): void {
        if (this.isLogin() && !this.rol) {
            this.employeesService.getEmployeeByEmail(this.email!)
            .subscribe(
                res => {
                    this.setRol(res.admin);
                },
                err => {
                    console.log(err);
                    this.logout();
                }
            );
        }
    }

    login (authResponse: AuthResponse): void {
        this.setToken(authResponse.token);
        this.setEmail(authResponse.user.email);
        this.routerService.goToHome();
        this.setSession();
    }

    logout (): void {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        sessionStorage.removeItem('rol');
        this.routerService.goToLogin();
    }

    isLogin (): boolean {
        if (this.token) return true;
        return false;
    }

    isAdmin (): boolean {
        if (this.rol == 'admin') return true;
        return false;
    }

    get token (): string | null {
        return localStorage.getItem('token');
    }
    
    get email (): string | null {
        return localStorage.getItem('email');
    }

    get rol (): string | null {
        return sessionStorage.getItem('rol');
    }
    
    setToken (token: string): void {
        localStorage.setItem('token', token);
    }
    
    setEmail (email: string): void {
        localStorage.setItem('email', email);
    }

    setRol (isAdmin: boolean): void {
        sessionStorage.setItem('rol', isAdmin ? 'admin' : 'employee');
    }

}