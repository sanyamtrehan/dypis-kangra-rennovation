import { FormControl } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  faCaretDown,
  faCaretUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';

import { faculty } from 'src/app/utils/data';
import { bounceInUpAnimation } from 'src/app/utils/animation';
import { Faculty, FacultyHeaders, SortByEnum } from 'src/app/models/interfaces';
import { updateAnimationStateOnScroll } from 'src/app/utils/helpers';

@Component({
  selector: 'faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss'],
  animations: [bounceInUpAnimation],
})
export class FacultyComponent implements AfterViewInit {
  state = 'start';
  faculty = faculty.slice();
  faSearch = faSearch;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  filteredFaculty = new BehaviorSubject<Faculty[]>([]);
  searchFacultyCtrl = new FormControl();
  updateAnimationStateOnScroll = updateAnimationStateOnScroll;
  sortByEnum = SortByEnum;
  @ViewChild('facultySection') facultySection!: ElementRef<HTMLDivElement>;

  readonly headers: FacultyHeaders[] = [
    {
      header: 'name',
      sortBy: SortByEnum.NONE,
    },
    {
      header: 'designation',
      sortBy: SortByEnum.NONE,
    },
    {
      header: 'qualification',
      sortBy: SortByEnum.NONE,
    },
  ];

  readonly mobileHeaders: FacultyHeaders[] = this.headers.slice();

  constructor() {
    this.attachListener();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateAnimationStateOnScroll(
        this.facultySection?.nativeElement,
        this.state,
      );
    }, 0);
  }

  attachListener(): void {
    this.filteredFaculty.next(this.faculty.slice());
    this.searchFacultyCtrl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchVal) => {
        searchVal = searchVal.trim();

        if (!searchVal) {
          this.filteredFaculty.next(faculty.slice());
          return;
        }

        searchVal = searchVal.replace(/ {2,}/g, ' ').toLowerCase();
        this.filteredFaculty.next(
          faculty?.filter(
            (el) => el.name.toLowerCase().indexOf(searchVal) > -1,
          ),
        );
      });
  }

  sortBy(index: number): void {
    const header = this.headers[index];
    let res: Faculty[] = [];
    switch (header.sortBy) {
      case SortByEnum.NONE: {
        this.headers[index].sortBy = SortByEnum.ASC;
        res = this.faculty.sort((a, b) => {
          const conA = a[header.header];
          const conB = b[header.header];
          if (typeof conA === 'number' && typeof conB === 'number') {
            return conA - conB;
          }
          return (conA + '').localeCompare(conB + '');
        });
        break;
      }
      case SortByEnum.ASC: {
        this.headers[index].sortBy = SortByEnum.DESC;
        res = this.faculty.sort((a, b) => {
          const conA = a[header.header];
          const conB = b[header.header];
          if (typeof conA === 'number' && typeof conB === 'number') {
            return conB - conA;
          }
          return (conB + '').localeCompare(conA + '');
        });
        break;
      }
      case SortByEnum.DESC: {
        this.headers[index].sortBy = SortByEnum.NONE;
        res = faculty.slice();
        break;
      }
    }
    this.filteredFaculty.next(res);
  }
}
