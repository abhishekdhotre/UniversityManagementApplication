import { Component, OnInit } from '@angular/core';
import {UniversityModel} from '../university.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UniversityService} from '../university.service';

@Component({
  selector: 'app-university-detail',
  templateUrl: './university-detail.component.html',
  styleUrls: ['./university-detail.component.scss']
})
export class UniversityDetailComponent implements OnInit {
  university: UniversityModel;
  id: number;

  constructor(private universityService: UniversityService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
          this.id = +param['id'];
          this.universityService.getUniversity(this.id).subscribe(
          (u: UniversityModel) => {
            this.university = u;
          }
        );
      }
    );
  }

  onEditUniversity() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteUniversity(universityModel: UniversityModel) {
    this.universityService.deleteUniveristy(universityModel.id);
    this.router.navigate(['/university']);
  }
}
