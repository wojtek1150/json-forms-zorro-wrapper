import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooleanControlRenderer, DescriptionRenderer, NzValidationStatusPipe } from '@wojtek1150/jsonforms-zorro-wrapper';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BooleanControlRenderer', () => {
  let component: BooleanControlRenderer;
  let fixture: ComponentFixture<BooleanControlRenderer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooleanControlRenderer, NzValidationStatusPipe, DescriptionRenderer],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BooleanControlRenderer);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
