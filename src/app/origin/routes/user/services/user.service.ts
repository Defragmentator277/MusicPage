import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable } from "rxjs"
//
import { UserModel, UserModelExpanded } from "src/app/origin/models/user.model"
import { ModalWindowService } from "../../services/modal_window.service"
//
import { Functions, Variables } from "src/app/origin/global"

@Injectable()
export class UserService {
    url: string = Variables.urlServer + Variables.apiUser
    //
    private user = new BehaviorSubject<UserModel | undefined>(undefined)

    constructor(private http: HttpClient,
                private modalWindowService: ModalWindowService) {}

    getUserSubscription(): Observable<UserModel | undefined> {
        return this.user.asObservable()
    }

    getUser(): UserModel | undefined {
        return this.user.getValue()
    }

    getUserExpanded(cond = { idUser: this.user.getValue()?._id }): any | undefined {
        // user 
        console.log(cond);
        if(!cond.idUser)
        {
            this.modalWindowService.notifaction('Нет айди пользователя')
            return
        }
        return this.http.post(this.url + '/findByIdExpanded', cond).subscribe(
            Functions.serverResponse((user: any) => {
                console.log(user);
        }))
    }

    setUser(user: UserModel | undefined = undefined) {
        console.log(user);
        this.user.next(user)
    } 

    refreshUserState(idUser = this.user.getValue()?._id) {
        if(!idUser)
            return
        this.postFindUserById({ idUser: idUser })
        .subscribe(Functions.serverResponse((user: UserModel) => {
            this.setUser(<UserModel>user)
        }));
    }
    //
    postFindUserByNamePass(cond: { username: string, password: string }) {
        return this.http.post(this.url + '/findByNamePassword', cond)
    }
    postFindUserById(cond: { idUser?: string }) {
        return this.http.post(this.url + '/findById', cond)
    }
    //
    postAddSongFavorite(cond: { idArtist: string, idAlbum: string, idSong: string, idUser?: string }) {
        if(!cond.idUser)
        {
            cond.idUser = <string>this.getUser()?._id

            if(!cond.idUser)
                this.modalWindowService.notifaction('Войдите чтобы добавлять песни!', 'Нет аккаунта')
        }

        return this.http.post(this.url + '/addFavoriteSong', cond);
    }
    postDelSongFavorite(cond: { idUser?: string, idSong: string }) {
        if(!cond.idUser)
        {
            cond.idUser = <string>this.getUser()?._id

            if(!cond.idUser)
                this.modalWindowService.notifaction('Войдите чтобы удалять песни!', 'Нет аккаунта')
        }

        return this.http.post(this.url + '/delFavoriteSong', cond)
    }
}