import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankfullComponent } from './thankfull.component';

describe('ThankfullComponent', () => {
  let component: ThankfullComponent;
  let fixture: ComponentFixture<ThankfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankfullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
