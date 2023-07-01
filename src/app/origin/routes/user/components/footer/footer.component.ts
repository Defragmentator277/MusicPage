import { Component } from '@angular/core'
// 
class Icon {
    name: string
    src: string
    // 
    constructor(name: string, src: string) {
        this.name = name
        this.src = src
    }
}
// 
@Component({
    selector: 'footer-comp',
    templateUrl: './footer.component.html',
    styleUrls: [ './footer.component.sass' ]
})
// 
export class FooterComponent { 
    preSrc: string = '/assets/icons/'
    // 
    icons: Icon[] = [
        { name: 'vk', src: this.preSrc + 'vk_icon.png' },
        { name: 'facebook', src: this.preSrc + 'facebook_icon.png' },
        { name: 'instagram', src: this.preSrc + 'instagram_icon.png' }
    ];
}