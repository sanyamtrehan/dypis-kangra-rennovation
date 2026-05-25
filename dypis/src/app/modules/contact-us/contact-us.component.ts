import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  faCalendarAlt,
  faEnvelopeOpen,
  faLocationArrow,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';

import { updateAnimationStateOnScroll } from 'src/app/utils/helpers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements AfterViewInit {
  state = 'start';
  offsetVal = 0;
  updateAnimationStateOnScroll = updateAnimationStateOnScroll;
  mapsEmbedUrl;
  @ViewChild('contactUsSection')
  contactUsSection!: ElementRef<HTMLDivElement>;
  @ViewChild('maxWidthDivContent')
  maxWidthDivContent!: ElementRef<HTMLDivElement>;
  faLocationArrow = faLocationArrow;
  faEnvelopeOpen = faEnvelopeOpen;
  faPhoneVolume = faPhoneVolume;
  faCalendarAlt = faCalendarAlt;
  contactNoPrimary = '+91 7807080536';
  // contactNoSecondary = '+91 7807586358';
  email = 'dypisk@gmail.com';

  constructor(private sanitizer: DomSanitizer) {
    this.mapsEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      environment.mapsEmbedUrl,
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateAnimationStateOnScroll(
        this.contactUsSection?.nativeElement,
        this.state,
      );
      this.updateXVal();
    }, 0);
  }

  updateXVal(): void {
    this.offsetVal =
      this.maxWidthDivContent?.nativeElement?.getBoundingClientRect().x;
  }
}
