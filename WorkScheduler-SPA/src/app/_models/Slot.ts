import { Job } from './Job';

export interface Slot {
    index: number;
    job: Job;
    filled: boolean;
    defaultTimeFrom: Date;
    defaultTimeTo: Date;
}
