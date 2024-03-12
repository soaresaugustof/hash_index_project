using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;

namespace webapp.Models.HashTable
{
    public class Bucket
    {
        // key = Valor de Hash
        // value = Página
        private readonly Cell<string, int>[] bucket;
        private int index;
        private Bucket next;

        public Bucket(int capacidadeMaxima)
        {
            this.bucket = new Cell<string, int>[capacidadeMaxima];
            this.index = 0;
        }

        public void AddRegistro(string valorHashKey, int pagina)
        {
            try
            {
                bucket[index].AddCell(valorHashKey, pagina);
                index++;
            }
            catch (System.NullReferenceException)
            {
                Console.WriteLine("\n-------> erro null pointer exception\n");
                throw;
            }
        }
    }
}
