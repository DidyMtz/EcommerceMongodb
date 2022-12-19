import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsupprproduitComponent } from './modalsupprproduit.component';

describe('ModalsupprproduitComponent', () => {
  let component: ModalsupprproduitComponent;
  let fixture: ComponentFixture<ModalsupprproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsupprproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalsupprproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
