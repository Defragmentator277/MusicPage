import { Component, OnInit } from "@angular/core"
//services
import { LoginService } from "./services/login.service"

@Component({
    selector: 'user-comp',
    templateUrl: './user.component.html',
    styleUrls: [ './user.component.sass' ]
})

export class UserComponent {

    constructor(private loginService: LoginService) { }
}
