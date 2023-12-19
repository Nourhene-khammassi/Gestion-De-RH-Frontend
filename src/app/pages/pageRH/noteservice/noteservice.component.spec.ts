import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteserviceComponent } from './noteservice.component';

describe('NoteserviceComponent', () => {
  let component: NoteserviceComponent;
  let fixture: ComponentFixture<NoteserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
