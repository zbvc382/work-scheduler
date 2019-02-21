import { Address } from 'cluster';

export interface Landlord {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    addressId?: number;
    address?: Address;
}
