import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {UniversityModel} from '../university.model';
import {Subscription} from 'rxjs';
import {UniversityService} from '../university.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.scss']
})

@Injectable()
export class UniversityListComponent implements OnInit, OnDestroy {

  universities: UniversityModel[];
  subscription: Subscription;
  constructor(private universityService: UniversityService,
              private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.universityService.universityUpdated.subscribe(
      (universities: UniversityModel[]) => {
        this.universities = universities;
      }
    );
    this.universityService.getUniversities();
  }

  onNewUniversity() {
    this.route.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
