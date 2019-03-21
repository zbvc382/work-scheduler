import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../_models/Photo';

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent implements OnInit {
  @Input() photos: Photo[];

  constructor() { }

  ngOnInit() {
  }

}
