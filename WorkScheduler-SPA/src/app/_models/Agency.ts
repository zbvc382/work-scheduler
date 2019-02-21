import { Address } from './Address';

export interface Agency {
    id: number;
    name: string;
    email: string;
    contactName: string;
    phoneNumber: string;
    addressId: string;
    address: Address;
}
