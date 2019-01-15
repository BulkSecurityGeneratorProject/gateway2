/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Gateway2TestModule } from '../../../../test.module';
import { FamilleDetailComponent } from 'app/entities/backend/famille/famille-detail.component';
import { Famille } from 'app/shared/model/backend/famille.model';

describe('Component Tests', () => {
    describe('Famille Management Detail Component', () => {
        let comp: FamilleDetailComponent;
        let fixture: ComponentFixture<FamilleDetailComponent>;
        const route = ({ data: of({ famille: new Famille(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Gateway2TestModule],
                declarations: [FamilleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FamilleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FamilleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.famille).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
