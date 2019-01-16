/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Gateway2TestModule } from '../../../../test.module';
import { LivreDetailComponent } from 'app/entities/backend/livre/livre-detail.component';
import { Livre } from 'app/shared/model/backend/livre.model';

describe('Component Tests', () => {
    describe('Livre Management Detail Component', () => {
        let comp: LivreDetailComponent;
        let fixture: ComponentFixture<LivreDetailComponent>;
        const route = ({ data: of({ livre: new Livre(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Gateway2TestModule],
                declarations: [LivreDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LivreDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LivreDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.livre).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
