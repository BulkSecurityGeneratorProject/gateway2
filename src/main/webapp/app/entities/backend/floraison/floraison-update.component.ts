import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFloraison } from 'app/shared/model/backend/floraison.model';
import { FloraisonService } from './floraison.service';
import { IPlante } from 'app/shared/model/backend/plante.model';
import { PlanteService } from 'app/entities/backend/plante';
import { IMois } from 'app/shared/model/backend/mois.model';
import { MoisService } from 'app/entities/backend/mois';

@Component({
    selector: 'jhi-floraison-update',
    templateUrl: './floraison-update.component.html'
})
export class FloraisonUpdateComponent implements OnInit {
    floraison: IFloraison;
    isSaving: boolean;

    plantes: IPlante[];

    mois: IMois[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected floraisonService: FloraisonService,
        protected planteService: PlanteService,
        protected moisService: MoisService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ floraison }) => {
            this.floraison = floraison;
        });
        this.planteService.query().subscribe(
            (res: HttpResponse<IPlante[]>) => {
                this.plantes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.moisService.query().subscribe(
            (res: HttpResponse<IMois[]>) => {
                this.mois = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.floraison.id !== undefined) {
            this.subscribeToSaveResponse(this.floraisonService.update(this.floraison));
        } else {
            this.subscribeToSaveResponse(this.floraisonService.create(this.floraison));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFloraison>>) {
        result.subscribe((res: HttpResponse<IFloraison>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPlanteById(index: number, item: IPlante) {
        return item.id;
    }

    trackMoisById(index: number, item: IMois) {
        return item.id;
    }
}
