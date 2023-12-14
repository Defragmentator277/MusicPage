import { Component } from "@angular/core"
import { Router } from "@angular/router" 
//
import { UserService } from "../../../../services/user.service"
import { ModalWindowService } from "src/app/origin/routes/services/modal_window.service"
import { Functions } from "src/app/origin/global"

@Component({
    selector: 'enter-comp',
    templateUrl: './enter.component.html',
    styleUrls: [ './enter.component.sass' ]
}) 

export class EnterComponent {
    name: string = 'Zimin'
    password: string = '12345678'
    

    constructor(private route: Router, private userService: UserService, private modalWindowService: ModalWindowService) { }

    clickSubmit() {
        if(!this.name)
        {
            this.modalWindowService.notifaction('Вы не ввели имя!')
            return
        }
        if(!this.password)
        {
            this.modalWindowService.notifaction('Вы не ввели пароль!')
            return
        }
        if(this.password.length < 8)
        {
            this.modalWindowService.notifaction('Пароль должен быть 8 значным!')
            return
        }


        this.userService.postFindUserByNamePass({ username: this.name, password: this.password })
        .subscribe(Functions.serverResponse((user: any) => {
            if(user)
            {
                this.userService.setUser(user);
                this.modalWindowService.notifaction('Вы успешно вошли!')
                this.route.navigate(['/user/top_100'])
            }
            else
                this.modalWindowService.notifaction('У вас не получилось войти!')
        }))
    }
}