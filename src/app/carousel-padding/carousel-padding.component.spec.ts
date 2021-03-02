import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPaddingComponent } from './carousel-padding.component';

describe('CarouselPaddingComponent', () => {
  let component: CarouselPaddingComponent;
  let fixture: ComponentFixture<CarouselPaddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselPaddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselPaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
