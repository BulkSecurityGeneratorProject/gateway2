import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Gateway2SharedModule } from 'app/shared';
import {
    EnsoleillementComponent,
    EnsoleillementDetailComponent,
    EnsoleillementUpdateComponent,
    EnsoleillementDeletePopupComponent,
    EnsoleillementDeleteDialogComponent,
    ensoleillementRoute,
    ensoleillementPopupRoute
} from './';

const ENTITY_STATES = [...ensoleillementRoute, ...ensoleillementPopupRoute];

@NgModule({
    imports: [Gateway2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EnsoleillementComponent,
        EnsoleillementDetailComponent,
        EnsoleillementUpdateComponent,
        EnsoleillementDeleteDialogComponent,
        EnsoleillementDeletePopupComponent
    ],
    entryComponents: [
        EnsoleillementComponent,
        EnsoleillementUpdateComponent,
        EnsoleillementDeleteDialogComponent,
        EnsoleillementDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Gateway2EnsoleillementModule {}
