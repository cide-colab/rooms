import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';

@Component({
  selector: 'page-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPage implements OnInit {

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  constructor() {
  }


  ngOnInit() {
  }

}
