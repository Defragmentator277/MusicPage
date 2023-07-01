import { Component, OnInit } from "@angular/core"
//services
import { LoginService } from "./services/login.service"
//
// import { UserModel } from "../../models/user.model"
// import { ServerAnswer } from "../../models/server_answer.model";

@Component({
    selector: 'user-comp',
    templateUrl: './user.component.html',
    styleUrls: [ './user.component.sass' ]
})

export class UserComponent{
    // user: UserModel;

    constructor(private loginService: LoginService) {
        // this.user = new UserModel();
    }

    // authorizationUser() {
    //     if(this.user.username && this.user.password)
    //         this.loginService.postAuthorizationUser(this.user)
    //         .subscribe({
    //             next(ans) {
    //                 if((<ServerAnswer>ans).status !== 'failed')
    //                 {
    //                     console.log((<ServerAnswer>ans).answer);
    //                     alert("You successfully log in!");
    //                 }
    //                 else
    //                     alert('Get ERROR!');
    //             },
    //             error(err) {
    //                 console.log(err);
    //                 alert("GET ERROR!");
    //             }
    //         })
    //     else
    //         alert('Enter username and password')
    // }

    // ngOnInit() {
    //     this.authorizationUser();
    // }
}
