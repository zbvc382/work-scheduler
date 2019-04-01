import { Agency } from './Agency';
import { Tag } from './Tag';
import { Photo } from './Photo';
import { ApplianceType } from './ApplianceType';

export interface Job {
    id: number;
    jobNumber: string;
    visit: number;
    report?: string;
    visitToDisplay?: string;
    payerType: string;
    problemGiven?: string;
    dateAssigned: Date;
    timeFrom: Date;
    timeTo: Date;
    slotReplaced: boolean;
    slotIndex?: number;
    key?: boolean;
    keyAddress?: string;
    address?: string;
    postCode?: string;
    agencyReference?: string;
    landlordName?: string;
    landlordPhone?: string;
    privateName?: string;
    privatePhone?: string;
    tenantName?: string;
    tenantPhone?: string;
    agency?: Agency;
    applianceType?: ApplianceType;
    agencyContactName: string;
    agencyPhone: string;
    tags: Tag[];
    photos: Photo[];
}
