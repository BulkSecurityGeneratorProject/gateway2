import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRecolte } from 'app/shared/model/backend/recolte.model';
import { RecolteService } from './recolte.service';
import { IPlante } from 'app/shared/model/backend/plante.model';
import { PlanteService } from 'app/entities/backend/plante';
import { IMois } from 'app/shared/model/backend/mois.model';
import { MoisService } from 'app/entities/backend/mois';

@Component({
    selector: 'jhi-recolte-update',
    templateUrl: './recolte-update.component.html'
})
export class RecolteUpdateComponent implements OnInit {
    recolte: IRecolte;
    isSaving: boolean;

    plantes: IPlante[];

    mois: IMois[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected recolteService: RecolteService,
        protected planteService: PlanteService,
        protected moisService: MoisService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ recolte }) => {
            this.recolte = recolte;
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
        if (this.recolte.id !== undefined) {
            this.subscribeToSaveResponse(this.recolteService.update(this.recolte));
        } else {
            this.subscribeToSaveResponse(this.recolteService.create(this.recolte));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecolte>>) {
        result.subscribe((res: HttpResponse<IRecolte>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
