import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingBoxComponent } from './addingbox.component';

describe('AddingwindowComponent', () => {
  let component: AddingBoxComponent;
  let fixture: ComponentFixture<AddingBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
