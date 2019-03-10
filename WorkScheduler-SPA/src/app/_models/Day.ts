import { Slot } from './Slot';

export interface Day {
    id: number;
    date: Date;
    slots: Slot[];
}
