import { Job } from './Job';

export interface Slot {
    job: Job;
    filled: boolean;
    defaultTimeFrom: Date;
    defaultTimeTo: Date;
}
