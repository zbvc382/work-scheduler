import { Agency } from './Agency';
import { Landlord } from './Landlord';
import { Private } from './Private';
import { Tenant } from './Tenant';

export interface Job {
    id: number;
    payerType: string;
    problemGiven: string;
    dateAssigned: Date;
    timeFrom: Date;
    timeTo: Date;
    slotReplaced: boolean;
    slotIndex?: number;
    address?: string;
    postcode?: string;
    agencyId?: number;
    agency?: Agency;
    landlordId?: number;
    landlord: Landlord;
    privateId?: number;
    private: Private;
    tenantId?: number;
    tenant: Tenant;
}
