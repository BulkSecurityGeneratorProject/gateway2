/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Gateway2TestModule } from '../../../../test.module';
import { InteractionPlantePlanteDeleteDialogComponent } from 'app/entities/backend/interaction-plante-plante/interaction-plante-plante-delete-dialog.component';
import { InteractionPlantePlanteService } from 'app/entities/backend/interaction-plante-plante/interaction-plante-plante.service';

describe('Component Tests', () => {
    describe('InteractionPlantePlante Management Delete Component', () => {
        let comp: InteractionPlantePlanteDeleteDialogComponent;
        let fixture: ComponentFixture<InteractionPlantePlanteDeleteDialogComponent>;
        let service: InteractionPlantePlanteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Gateway2TestModule],
                declarations: [InteractionPlantePlanteDeleteDialogComponent]
            })
                .overrideTemplate(InteractionPlantePlanteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InteractionPlantePlanteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InteractionPlantePlanteService);
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
