using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapp.Models.HashTable
{
    public class Cell<TKey, TValue>
    {
        public Cell(TKey hashValue, TValue pagina)
        {
            HashValue = hashValue;
            Pagina = pagina;
        }

        public Cell<TKey, TValue> AddCell(TKey hashValue, TValue pagina)
        {
            return new Cell<TKey, TValue>(hashValue, pagina);
        }

        // key
        public TKey HashValue { get; }

        // value
        public TValue Pagina { get; }
    }
}
