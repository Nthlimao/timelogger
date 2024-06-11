using System;
using System.Collections.Generic;

namespace Timelogger.Dto
{
    public class PagedResultDTO<T>
    {
        public List<T> Items { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
        public List<PagedColumnsDTO> Columns { get; set; }
    }
}
