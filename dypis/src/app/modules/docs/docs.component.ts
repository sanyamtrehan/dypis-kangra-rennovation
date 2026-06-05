import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Doc } from 'src/app/models/interfaces';
import { DocsService } from './docs.service';
import { updateAnimationStateOnScroll } from 'src/app/utils/helpers';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent {
  state = 'start';
  updateAnimationStateOnScroll = updateAnimationStateOnScroll;

  docs$ = this.docsService.docs$;

  faSearch = faSearch;
  docsFilterCtrl = new FormControl<string>('');

  generalInformation = [
    { id: 1, label: 'Name of the School', value: '' },
    { id: 2, label: 'Affiliation Number (if applicable)', value: '' },
    { id: 3, label: 'School Code (if applicable)', value: '' },
    { id: 4, label: 'Complete Address with PIN Code', value: '' },
    { id: 5, label: 'Principal Name & Qualification', value: '' },
    { id: 6, label: 'School Email ID', value: '' },
    { id: 7, label: 'Contact Details (Landline/Mobile)', value: '' },
  ];

  classXResults = [
    {
      id: 1,
      year: 2025,
      registered: '',
      passed: '',
      percentage: '',
      remarks: '',
    },
    {
      id: 2,
      year: 2024,
      registered: '',
      passed: '',
      percentage: '',
      remarks: '',
    },
    {
      id: 3,
      year: 2023,
      registered: '',
      passed: '',
      percentage: '',
      remarks: '',
    },
  ];

  classXIIResults = [
    {
      id: 1,
      year: 2025,
      registered: '',
      passed: '',
      percentage: '',
      remarks: '',
    },
    {
      id: 2,
      year: 2024,
      registered: '',
      passed: '',
      percentage: '',
      remarks: '',
    },
    {
      id: 3,
      year: 2023,
      registered: '',
      passed: '',
      percentage: '',
      remarks: '',
    },
  ];

  staffInformation = [
    { id: 1, label: 'Principal', value: '' },
    { id: 2, label: 'Total No. of Teachers', value: '' },
    { id: 3, label: 'PGT', value: '' },
    { id: 4, label: 'TGT', value: '' },
    { id: 5, label: 'PRT', value: '' },
    { id: 6, label: 'Teachers Section Ratio', value: '' },
    { id: 7, label: 'Details of Special Educator', value: '' },
    {
      id: 8,
      label: 'Details of Counsellor and Wellness Teacher',
      value: '',
    },
  ];

  infrastructureInformation = [
    {
      id: 1,
      label: 'Total Campus Area of the School (in Square Mtr)',
      value: '',
    },
    {
      id: 2,
      label: 'No. and Size of the Class Rooms (in Square Mtr)',
      value: '',
    },
    {
      id: 3,
      label:
        'No. and Size of Laboratories Including Computer Labs (in Square Mtr)',
      value: '',
    },
    {
      id: 4,
      label: 'Internet Facility (Yes/No)',
      value: '',
    },
    {
      id: 5,
      label: 'No. of Girls Toilets',
      value: '',
    },
    {
      id: 6,
      label: 'No. of Boys Toilets',
      value: '',
    },
    {
      id: 7,
      label:
        'Link of YouTube Video of the Inspection of School Covering the Infrastructure of the School',
      value: '',
    },
  ];

  constructor(private readonly docsService: DocsService) {}

  onSelectDoc(document: string): void {
    window.open(document);
  }
}
