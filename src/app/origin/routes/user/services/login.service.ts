import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
// 
import { Variables } from 'src/app/origin/global';
import { UserModel } from 'src/app/origin/models/user.model';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) {}
    
    postAuthorizationUser(user: UserModel) {
        return this.http.post(Variables.urlServer + Variables.apiUser + '/login', {
            username: user.username,
            password: user.password
        })
    }
}