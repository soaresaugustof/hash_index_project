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
        private readonly Cell<int, int>[] bucket;
        private int index;
        private Bucket next;

        public Bucket(int capacidadeMaxima)
        {
            this.bucket = new Cell<int, int>[capacidadeMaxima];
            this.index = 0;
        }

        public void AddRegistro(int valorHash, int pagina)
        {
            try
            {
                bucket[index].AddCell(valorHash, pagina);
                index++;
            }
            catch (System.NullReferenceException)
            {
                Console.WriteLine("erro null pointer exception");
                throw;
            }
        }
    }
}
