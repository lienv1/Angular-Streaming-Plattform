import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorinfoComponent } from './actorinfo.component';

describe('ActorinfoComponent', () => {
  let component: ActorinfoComponent;
  let fixture: ComponentFixture<ActorinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
