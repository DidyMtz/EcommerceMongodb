import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsuppruserComponent } from './modalsuppruser.component';

describe('ModalsuppruserComponent', () => {
  let component: ModalsuppruserComponent;
  let fixture: ComponentFixture<ModalsuppruserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsuppruserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalsuppruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
