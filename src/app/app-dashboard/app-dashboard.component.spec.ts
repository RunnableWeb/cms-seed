
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDashboardComponent } from './app-dashboard.component';

describe('AppNavComponent', () => {
  let component: AppDashboardComponent;
  let fixture: ComponentFixture<AppDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
