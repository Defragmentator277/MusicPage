import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'expand-container-comp',
    templateUrl: './expand_container.component.html',
    styleUrls: [ './expand_container.component.sass' ]
})

export class ExpandContainer {
    //two way binding
    @Input() expand!: boolean
    @Output() expandChange = new EventEmitter<boolean>()
    //
    @Input() title: string = ''
    @Input() showExtend: boolean = true

    constructor() {}

    expandContainer() {
        this.expandChange.emit(!this.expand);
    }
}