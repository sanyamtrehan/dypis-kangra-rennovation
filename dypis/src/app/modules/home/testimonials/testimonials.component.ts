import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { zoomUpAnimation } from 'src/app/utils/animation';

import { updateAnimationStateOnScroll } from 'src/app/utils/helpers';
import { TestimonialsService } from './testimonials.service';

@Component({
  selector: 'testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  animations: [zoomUpAnimation],
})
export class TestimonialsComponent implements AfterViewInit {
  schoolStats = this.testimonialsService.schoolStats;
  testimonials = this.testimonialsService.testimonials;
  quoteLeft = faQuoteLeft;
  quoteRight = faQuoteRight;
  state = 'start';
  translatePos = 0;
  offsetPos = 0;
  iterationNumber = 0;
  readonly TRANSLATE_BY = 100;
  readonly OFFSET_ADD = 24;
  readonly REMAINING_CARDS = 2;
  readonly TRANSITION_TIMING = 3000; // in milliseconds
  @ViewChild('testimonialDiv') testimonialDiv!: ElementRef;
  updateAnimationStateOnScroll = updateAnimationStateOnScroll;
  statNumberArray: number[] = new Array(
    this.testimonialsService.testimonials.length
  ).fill(0);
  @ViewChild('testimonialsSection')
  testimonialsSection!: ElementRef<HTMLDivElement>;

  constructor(private readonly testimonialsService: TestimonialsService) {
    this.applyTransition();
    this.startNoStats();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateAnimationStateOnScroll(
        this.testimonialsSection?.nativeElement,
        this.state
      );
    }, 0);
  }

  applyTransition() {
    setInterval(() => {
      const divEl = this.testimonialDiv?.nativeElement;
      if (this.state === 'start' || !divEl) {
        return;
      }
      this.iterationNumber++;
      this.translatePos -= this.TRANSLATE_BY;
      divEl.style.transform = `translateX(${this.translatePos}%)`;

      const arrayLength = this.testimonials.length;
      if (arrayLength - this.iterationNumber <= this.REMAINING_CARDS) {
        this.testimonials.push(...this.testimonialsService.testimonials);
      }
    }, this.TRANSITION_TIMING);
  }

  startNoStats() {
    this.statNumberArray.forEach((_, index) => {
      let duration = 100 - this.schoolStats[index]?.totalNo;
      if (duration < 5) {
        duration = 5;
      }
      const int = setInterval(() => {
        if (this.state === 'start') {
          return;
        }
        if (this.statNumberArray[index] === this.schoolStats[index]?.totalNo) {
          clearInterval(int);
          return;
        }
        this.statNumberArray[index]++;
      }, duration);
    });
  }
}
