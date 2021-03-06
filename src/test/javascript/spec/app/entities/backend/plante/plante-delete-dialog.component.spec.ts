/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Gateway2TestModule } from '../../../../test.module';
import { PlanteDeleteDialogComponent } from 'app/entities/backend/plante/plante-delete-dialog.component';
import { PlanteService } from 'app/entities/backend/plante/plante.service';

describe('Component Tests', () => {
    describe('Plante Management Delete Component', () => {
        let comp: PlanteDeleteDialogComponent;
        let fixture: ComponentFixture<PlanteDeleteDialogComponent>;
        let service: PlanteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Gateway2TestModule],
                declarations: [PlanteDeleteDialogComponent]
            })
                .overrideTemplate(PlanteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlanteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlanteService);
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
