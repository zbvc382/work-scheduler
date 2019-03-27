import { Agency } from './Agency';

export interface ExtraJob {
    id: number;
    payerType: string;
    applianceType?: string;
    address: string;
    postCode: string;
    key?: boolean;
    problemGiven?: string;
    keyAddress?: string;
    postcode?: string;
    agencyReference?: string;
    landlordName?: string;
    landlordPhone?: string;
    privateName?: string;
    privatePhone?: string;
    tenantName?: string;
    tenantPhone?: string;
    agency?: Agency;
}
