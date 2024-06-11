using System;

namespace Timelogger.Dto
{
    public class PagedColumnsDTO
    {
        public string Id { get; set; }
        public string Header { get; set; }
        public Boolean? HasSort { get; set; }
    }
}
