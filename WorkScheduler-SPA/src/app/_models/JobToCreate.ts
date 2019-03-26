import { Agency } from './Agency';

export interface JobToCreate {
    payerType: string;
    report?: string;
    applianceType?: string;
    problemGiven?: string;
    dateAssigned: Date;
    timeFrom: Date;
    timeTo: Date;
    address: string;
    postCode: string;
    slotReplaced: boolean;
    slotIndex?: number;
    key?: boolean;
    keyAddress?: string;
    postcode?: string;
    agencyReference?: string;
    landlordName?: string;
    landlordPhone?: string;
    privateName?: string;
    privatePhone?: string;
    tenantName?: string;
    tenantPhone?: string;
    agencyContactName: string;
    agencyPhone: string;
    agency?: Agency;
}
