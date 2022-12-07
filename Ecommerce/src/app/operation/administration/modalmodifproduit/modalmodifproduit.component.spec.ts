import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmodifproduitComponent } from './modalmodifproduit.component';

describe('ModalmodifproduitComponent', () => {
  let component: ModalmodifproduitComponent;
  let fixture: ComponentFixture<ModalmodifproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalmodifproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalmodifproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
