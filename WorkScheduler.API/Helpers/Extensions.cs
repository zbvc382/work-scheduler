using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace WorkScheduler.API.Helpers
{
    static class Extensions
    {
        public static void AddPagination(this HttpResponse response, int totalItems)
        {
            var paginationHeader = new PaginationHeader(totalItems);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }


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