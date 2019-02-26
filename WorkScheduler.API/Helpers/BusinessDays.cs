using System;

namespace WorkScheduler.API.Helpers
{
    public static class BusinessDays
    {
        public static DateTime getEndDate(DateTime start) {
            DateTime end;

            if (start.DayOfWeek == DayOfWeek.Sunday) {
                end = start.AddDays(9);
            }
            else {
                end = start.AddDays(8);
            }

            return end;
        }
    }
}