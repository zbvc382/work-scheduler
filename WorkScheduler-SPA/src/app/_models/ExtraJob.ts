import { Agency } from './Agency';
import { ApplianceType } from './ApplianceType';

export interface ExtraJob {
    id: number;
    payerType: string;
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
    applianceType?: ApplianceType;
}
