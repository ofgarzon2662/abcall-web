import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { EventService } from './commons/event.service';
import { RouterTestingModule } from '@angular/router/testing';
import {ToastComponent} from './commons/toast/toast.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let eventService: EventService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastComponent,
        HttpClientTestingModule,// Importamos ToastComponent en el módulo de pruebas
      ],
      declarations: [AppComponent],
      providers: [EventService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default values for title and visibility flags', () => {
    expect(component.title).toBe('abcall-web');
    expect(component.showMenu).toBeFalse();
    expect(component.showLogOut).toBeFalse();
    expect(component.showBackOption).toBeFalse();
  });

  it('should update visibility flags when showMenu event is emitted', () => {
    eventService.showMenu.emit();
    fixture.detectChanges();
    expect(component.showMenu).toBeTrue();
    expect(component.showLogOut).toBeTrue();
    expect(component.showBackOption).toBeFalse();
  });

  it('should call backAuthLogin and emit backAuthLogin event', () => {
    spyOn(eventService.backAuthLogin, 'emit');

    component.backAuthLogin();

    expect(eventService.backAuthLogin.emit).toHaveBeenCalled();
  });

  it('should call logOut, clear sessionStorage, and navigate to /auth', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(router, 'navigate');

    component.logOut();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('role');
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });
});
