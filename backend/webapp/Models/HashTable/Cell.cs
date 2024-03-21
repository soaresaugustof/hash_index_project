using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapp.Models.HashTable
{
    public class Cell<TKey, TValue>
    {
        private TKey hashValue;
        private TValue pagina;

        public Cell(TKey hashValue, TValue pagina)
        {
            this.HashValue = hashValue;
            this.Pagina = pagina;
        }

        // public Cell<TKey, TValue> AddCell(TKey hashValue, TValue pagina)
        // {
        //     return new Cell<TKey, TValue>(hashValue, pagina);
        // }

        // key
        public TKey HashValue
        {
            get => hashValue;
            private set => hashValue = value;
        }

        // value
        public TValue Pagina
        {
            get => pagina;
            private set => pagina = value;
        }
    }
}
