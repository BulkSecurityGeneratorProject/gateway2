/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Gateway2TestModule } from '../../../../test.module';
import { EspeceDeleteDialogComponent } from 'app/entities/backend/espece/espece-delete-dialog.component';
import { EspeceService } from 'app/entities/backend/espece/espece.service';

describe('Component Tests', () => {
    describe('Espece Management Delete Component', () => {
        let comp: EspeceDeleteDialogComponent;
        let fixture: ComponentFixture<EspeceDeleteDialogComponent>;
        let service: EspeceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Gateway2TestModule],
                declarations: [EspeceDeleteDialogComponent]
            })
                .overrideTemplate(EspeceDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EspeceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspeceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
