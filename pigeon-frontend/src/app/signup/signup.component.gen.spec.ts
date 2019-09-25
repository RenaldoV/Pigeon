import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../common/Loader';
import { SignupComponent } from './signup.component';
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  beforeEach(() => {
    const activatedRouteStub = {};
    const formBuilderStub = { group: object => ({}) };
    const routerStub = {};
    const loaderServiceStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SignupComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: Router, useValue: routerStub },
        { provide: LoaderService, useValue: loaderServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'createForm').and.callThrough();
      component.ngOnInit();
      expect(component.createForm).toHaveBeenCalled();
    });
  });
  describe('createForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });
  describe('register', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getClient').and.callThrough();
      component.register();
      expect(component.getClient).toHaveBeenCalled();
    });
  });
});
