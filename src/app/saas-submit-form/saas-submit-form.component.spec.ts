import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaasSubmitFormComponent } from './saas-submit-form.component';

describe('SaasSubmitFormComponent', () => {
  let component: SaasSubmitFormComponent;
  let fixture: ComponentFixture<SaasSubmitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaasSubmitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaasSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
