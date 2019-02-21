import { Address } from './Address';
import { Agency } from './Agency';
import { Landlord } from './Landlord';
import { Private } from './Private';
import { Tenant } from './Tenant';

export interface Job {
    id: number;
    payerType: string;
    problemGiven: string;
    dateCreated: Date;
    dateAssigned: Date;
    timeFrom: Date;
    timeTo: Date;
    addressId?: number;
    address?: Address;
    agencyId?: number;
    agency?: Agency;
    landlordId?: number;
    landlord: Landlord;
    privateId?: number;
    private: Private;
    tenantId?: number;
    tenant: Tenant;
}
