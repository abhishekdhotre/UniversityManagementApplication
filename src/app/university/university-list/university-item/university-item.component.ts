import {Component, Input, OnInit} from '@angular/core';
import {UniversityModel} from '../../university.model';
import {DataStorageService} from '../../../shared/data-storage.service';

@Component({
  selector: 'app-university-item',
  templateUrl: './university-item.component.html',
  styleUrls: ['./university-item.component.scss']
})
export class UniversityItemComponent implements OnInit {
  @Input() index: number;
  @Input() university: UniversityModel;
  constructor() { }

  ngOnInit() {  }

}
