import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexfieldDocsComponent } from './texfield-docs.component';

describe('TexfieldDocsComponent', () => {
  let component: TexfieldDocsComponent;
  let fixture: ComponentFixture<TexfieldDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TexfieldDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TexfieldDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
