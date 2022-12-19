import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmodifuserComponent } from './modalmodifuser.component';

describe('ModalmodifuserComponent', () => {
  let component: ModalmodifuserComponent;
  let fixture: ComponentFixture<ModalmodifuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalmodifuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalmodifuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
