using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webapp.Models.HashTable
{
    public class HashTable
    {
        // Conjunto de Buckets da Hash Table
        private Bucket[] buckets;

        // Quantidade de registros para cada Bucket
        private int registrosPorBucket;

        public HashTable(double quantidadeTotalRegistros, int quantidadeRegistrosPorBuckets)
        {
            int quantidadeBuckets = (int)
                Math.Round(quantidadeTotalRegistros / quantidadeRegistrosPorBuckets);

            buckets = new Bucket[quantidadeBuckets];
            this.registrosPorBucket = quantidadeRegistrosPorBuckets;
        }

        // Toda vez que adicionarmos um novo dado à HashTable, com a função hash,
        // criamos um novo Bucket com um determinado tamanho (registros por bucket)
        public void InsertBucket(string key)
        {
            int indiceHash = FuncaoHash(key);
            buckets[indiceHash] = new Bucket(registrosPorBucket);
        }

        // Função Hash que será utilizada para determinar qual bucket será selecionado
        private int FuncaoHash(string key)
        {
            uint keyNumber = ToNumber(key);
            int hashValue = (int)(keyNumber + 1) % buckets.Length;
            Console.WriteLine("hash value: " + hashValue);

            return 0;
        }

        private uint ToNumber(string key)
        {
            char[] chars = key.ToCharArray();
            StringBuilder auxKey = new StringBuilder("");

            foreach (var c in chars)
            {
                Console.Write(c + " ");
                auxKey.Append(c);
            }
            // DEBUG:
            // Console.WriteLine();
            Console.WriteLine(auxKey);

            return Convert.ToUInt32(auxKey.ToString());
        }

        private string AddLeftZeroIfSmallNumber(char c) => c < 100 ? "0" + (short)c : "" + (short)c;

        private string Stringify(string key)
        {
            return "";
        }

        public Bucket[] Buckets
        {
            get => buckets;
        }
    }
}
