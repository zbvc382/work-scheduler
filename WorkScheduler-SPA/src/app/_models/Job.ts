export interface Job {
  [x: string]: any;
    id: number;
    jobNumber: string;
    visit: number;
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
    postcode?: string;
    agencyReference?: string;
    landlordName?: string;
    landlordPhone?: string;
    privateName?: string;
    privatePhone?: string;
    tenantName?: string;
    tenantPhone?: string;
    agencyName?: string;
    agencyId?: number;
}
