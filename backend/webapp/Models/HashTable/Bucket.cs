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
        private readonly Cell<double, int>[] registrosBucket;
        private int index;
        private Bucket next;

        public Bucket(int capacidadeMaxima)
        {
            this.registrosBucket = new Cell<double, int>[capacidadeMaxima];
            this.index = 0;
        }

        public void AddRegistro(double valorHash, int pagina)
        {
            try
            {
                registrosBucket[index].AddCell(valorHash, pagina);
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
