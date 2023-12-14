import { Injectable } from "@angular/core"

@Injectable()
export class ModalWindowService {
    
    //modal windows
    notifaction(message: string, title: string = 'Уведомление') {
        alert(message);
    }
}