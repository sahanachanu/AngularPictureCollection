import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditImageComponent } from './new-edit-image.component';

describe('NewEditImageComponent', () => {
  let component: NewEditImageComponent;
  let fixture: ComponentFixture<NewEditImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEditImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
