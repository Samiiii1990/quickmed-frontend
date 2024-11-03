import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledListComponent } from './scheduled-list.component';

describe('ScheduledListComponent', () => {
  let component: ScheduledListComponent;
  let fixture: ComponentFixture<ScheduledListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduledListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
