import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Gateway2SharedModule } from 'app/shared';
import {
    TypeFeuillageComponent,
    TypeFeuillageDetailComponent,
    TypeFeuillageUpdateComponent,
    TypeFeuillageDeletePopupComponent,
    TypeFeuillageDeleteDialogComponent,
    typeFeuillageRoute,
    typeFeuillagePopupRoute
} from './';

const ENTITY_STATES = [...typeFeuillageRoute, ...typeFeuillagePopupRoute];

@NgModule({
    imports: [Gateway2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TypeFeuillageComponent,
        TypeFeuillageDetailComponent,
        TypeFeuillageUpdateComponent,
        TypeFeuillageDeleteDialogComponent,
        TypeFeuillageDeletePopupComponent
    ],
    entryComponents: [
        TypeFeuillageComponent,
        TypeFeuillageUpdateComponent,
        TypeFeuillageDeleteDialogComponent,
        TypeFeuillageDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Gateway2TypeFeuillageModule {}
