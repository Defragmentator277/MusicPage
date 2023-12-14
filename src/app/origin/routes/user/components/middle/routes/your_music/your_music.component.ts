import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
// 
import { UserService } from '../../../../services/user.service'
import { ModalWindowService } from 'src/app/origin/routes/services/modal_window.service'
//
import { UserModel, UserModelExpanded } from 'src/app/origin/models/user.model'
import { Functions } from 'src/app/origin/global'
 

@Component({
    selector: 'your-music-comp',
    templateUrl: './your_music.component.html',
    styleUrls: [ './your_music.component.sass' ]
})

export class YourMusicComponent implements OnInit {
    user?: UserModel

    constructor(private userService: UserService,
                private modalWindowService: ModalWindowService,
                private route: Router) { }
    
    ngOnInit() {
        const userSubscription = this.userService
        .getUserSubscription()
        .subscribe((user) => {
            //if user don`t enter navigate to top_100 page and remove this subscription
            if(!user)
            {
                this.modalWindowService.notifaction('Зайдите в свою учетную запись чтобы редактировать музыку', 'Ошибка!')
                this.route.navigate(['/user/top_100'])
                userSubscription.unsubscribe()
            }
            // if(user is UserModelExpanded)
            console.log(user);
            this.user = user
        })
        
        this.userService
        .getUserExpanded();
    }
}