import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

export class ConfirmationModalHelper {

    static openConfirmationModal(modalService: NgbModal, actionTitle: string, actionMessage: string): Promise<any> {
        const modalRef = modalService.open(ConfirmationModalComponent);
        modalRef.componentInstance.actionTitle = actionTitle;
        modalRef.componentInstance.actionMessage = actionMessage;
        return modalRef.result;
    }
}