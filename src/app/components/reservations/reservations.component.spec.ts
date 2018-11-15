import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {ReservationsComponent} from './reservations.component';
import {RestJsonArrayService} from '../../services/restcallback/restjsonarrayservice.service';
import {HttpClientModule} from '@angular/common/http';



describe('ReservationComponent', () => {
  let component: ReservationsComponent;
  let restJsonArrayService: RestJsonArrayService;
  let fixture: ComponentFixture<ReservationsComponent>;
  let testBedService: RestJsonArrayService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationsComponent],
      providers: [RestJsonArrayService],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsComponent);
    component = fixture.componentInstance;
    restJsonArrayService = fixture.debugElement.injector.get(RestJsonArrayService);
    testBedService = TestBed.get(RestJsonArrayService);
    fixture.detectChanges();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([RestJsonArrayService], (injectService: RestJsonArrayService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getJson() on the RestJsonArrayService when the ReservationsComponent is created', async(() => {
    fixture.detectChanges();
    spyOn(restJsonArrayService, 'getAllReservations').and.returnValue(Promise.resolve(true));

    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(restJsonArrayService.getAllReservations).toHaveBeenCalled();
    });
  }));
});
