import { Agency } from './Agency';
import { Tag } from './Tag';
import { Photo } from './Photo';

export interface Job {
    id: number;
    jobNumber: string;
    visit: number;
    report?: string;
    visitToDisplay?: string;
    payerType: string;
    applianceType?: string;
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
    agencyContactName: string;
    agencyPhone: string;
    tags: Tag;
    photos: Photo[];
}
