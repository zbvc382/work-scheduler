import { Job } from './Job';

export interface Slot {
    index?: number;
    job: Job;
    defaultFrom?: Date;
    defaultTo?: Date;
}
