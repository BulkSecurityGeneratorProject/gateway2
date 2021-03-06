import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnsoleillement } from 'app/shared/model/backend/ensoleillement.model';
import { EnsoleillementService } from './ensoleillement.service';

@Component({
    selector: 'jhi-ensoleillement-delete-dialog',
    templateUrl: './ensoleillement-delete-dialog.component.html'
})
export class EnsoleillementDeleteDialogComponent {
    ensoleillement: IEnsoleillement;

    constructor(
        protected ensoleillementService: EnsoleillementService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ensoleillementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ensoleillementListModification',
                content: 'Deleted an ensoleillement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ensoleillement-delete-popup',
    template: ''
})
export class EnsoleillementDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ensoleillement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EnsoleillementDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ensoleillement = ensoleillement;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
