import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaDocsComponent } from './schema-docs.component';

describe('SchemaDocsComponent', () => {
  let component: SchemaDocsComponent;
  let fixture: ComponentFixture<SchemaDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
