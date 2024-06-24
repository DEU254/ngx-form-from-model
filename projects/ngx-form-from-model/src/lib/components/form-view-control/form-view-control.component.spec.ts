import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewControlComponent } from './form-view-control.component';

describe('FormViewControlComponent', () => {
  let component: FormViewControlComponent;
  let fixture: ComponentFixture<FormViewControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormViewControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormViewControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
