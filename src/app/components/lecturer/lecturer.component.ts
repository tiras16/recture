import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Lecturers } from 'src/app/models/Lecturers';
import { LecturersService } from 'src/app/services/lecturers.service';


@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.scss']
})

export class LecturerComponent implements OnInit {
  id: number;
  imageObject;
  filterObject = [];
  lecturers : Lecturers = new Lecturers();
  submitted = false;
  searchText: any;
  quantityValue: string;

  constructor(
    private route: ActivatedRoute,
    private lectureService: LecturersService,
    ) {
      this.lectureService.getAll().subscribe( item => {
        this.imageObject = item;
      })
      this.filterObject = this.imageObject;
}

  ngOnInit(): void {

    setTimeout (() => {
      this.filterObject = this.imageObject}, 300);
  }

  onFilter(user)
  {

    console.log(user)
    if(user === "")
    {
      this.filterObject = this.imageObject;
    }
    else
    {
      user = user.toLocaleLowerCase();
      this.filterObject = this.imageObject.filter(item=> {

        if(item.name.toLocaleLowerCase().includes(user)){
          return item
        }
      });
    }
  }
}
