import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'component-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  material = false;


  constructor() {
  }

  ngOnInit(): void {
  }

}
