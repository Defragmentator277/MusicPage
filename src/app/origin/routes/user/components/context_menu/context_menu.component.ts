import { Component, Input } from '@angular/core'


@Component({
    selector: 'context-menu-comp',
    templateUrl: './context_menu.component.html',
    styleUrls: [ './context_menu.component.sass' ]
})
export class ContextMenuComponent {
    @Input() show: boolean = false

    
}

