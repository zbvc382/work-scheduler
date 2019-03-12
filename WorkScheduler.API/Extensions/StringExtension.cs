using System.Collections.Generic;

namespace WorkScheduler.API.Extensions
{
    static class StringExtension
    {
        public static bool ContainsWords(this string source, string querry)
        {
            if (source == null) {
                return false;
            }

            string[] sourceArr = source.ToLower().Split(' ');
            string[] queryArr = querry.ToLower().Split(' ');
            List<string> querryList = new List<string>(queryArr);
            var querryListCount = querryList.Count;

            foreach (string s in sourceArr)
            {
                for (int q = 0; q < querryListCount; q++)
                {
                    if (s == querryList[q])
                    {
                        querryList.RemoveAt(q);
                        querryListCount -= 1;

                        if (querryListCount == 0) {
                            return true;
                        }

                        break;
                    }
                }
            }
            return false;
        }
    }
}