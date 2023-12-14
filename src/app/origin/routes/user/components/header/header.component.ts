import { Component, OnInit, OnChanges } from "@angular/core"
//
import { UserService } from "../../services/user.service"
import { UserModel } from "src/app/origin/models/user.model"

@Component({
    selector: 'header-comp',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.sass' ]
})

export class HeaderComponent implements OnInit{ 
    user?: UserModel

    constructor(private userService: UserService) {

    }

    clickExit() {
        this.userService.setUser()
    }
    //
    ngOnInit() {
        this.userService
        .getUserSubscription()
        .subscribe((user) => {
            this.user = user
        })
    }
}