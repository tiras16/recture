import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Lecturers } from 'src/app/models/Lecturers';
import { CoursesService } from 'src/app/services/courses.service';
import { LecturerProfileService } from 'src/app/services/lecturerprofile.service';
import { LecturersService } from 'src/app/services/lecturers.service';

@Component({
    selector: 'app-courses' ,
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
  id: number;
  imageObject ;
  lecturers : Lecturers = new Lecturers();
  submitted = false;
  category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lectureService : LecturersService,
    private coursesService: CoursesService,
    ) { 

      this.lectureService.getAllCourses().subscribe( item => {
        this.imageObject = item;
        
      }) 

      this.coursesService.getCategories().subscribe( item => {
        this.category = item;
      })
  
}
  ngOnInit(): void {
    
  }

  // onRoute(id:number){
  //   this.router.navigate(['/lecturerprofile/'+ id]).then(() => {
  //     window.location.reload();
  //   });
  // }


  // onSeeMore(){
  //   this.submitted = true;

  //   this.lecturers.idUser= this.imageObject.id.value;

  //   this.LecturersService.postLecturers(this.lecturers).subscribe(
  //     item => {
  //       console.log(item);
  //     }
  //   );

  // }
}