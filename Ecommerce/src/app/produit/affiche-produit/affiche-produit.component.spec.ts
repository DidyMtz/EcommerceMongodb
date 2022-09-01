import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheProduitComponent } from './affiche-produit.component';

describe('AfficheProduitComponent', () => {
  let component: AfficheProduitComponent;
  let fixture: ComponentFixture<AfficheProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficheProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
