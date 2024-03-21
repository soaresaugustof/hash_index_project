using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webapp.Models.HashTable
{
    public class HashTable
    {
        private int numeroOverflows;
        private int numeroColisoes;
        private int numeroElementosAdicionados;

        // Conjunto de Buckets da Hash Table
        private Bucket[] buckets;

        // Quantidade de registros para cada Bucket
        private int registrosPorBucket;

        public HashTable(double quantidadeTotalRegistros, int quantidadeRegistrosPorBuckets)
        {
            numeroColisoes = 0;

            int quantidadeBuckets = (int)
                Math.Round(quantidadeTotalRegistros / quantidadeRegistrosPorBuckets);

            buckets = new Bucket[quantidadeBuckets];
            this.registrosPorBucket = quantidadeRegistrosPorBuckets;
        }

        // Toda vez que adicionarmos um novo dado à HashTable, com a função hash,
        // criamos um novo Bucket com um determinado tamanho (registros por bucket)
        public void InsertBucket(string key, int page)
        {
            int indiceHash = FuncaoHash(key);
            // Console.WriteLine("indiceHash: " + indiceHash);
            if (buckets[indiceHash] == null)
            {
                buckets[indiceHash] = new Bucket(registrosPorBucket);
            }

            try
            {
                buckets[indiceHash].AddRegistro(key, page);
            }
            catch (IndexOutOfRangeException) // ALGORITMO DE RESOLUÇÃO DE OVERFLOW E COLISÕES #2
            {
                numeroColisoes++;

                Bucket bucketAddressRef = buckets[indiceHash];

                while (bucketAddressRef.Next != null)
                {
                    bucketAddressRef = bucketAddressRef.Next;
                }

                // Lógica: Se o bucket não foi completamente preenchido, será adicionado
                // um novo registro. Caso contrário, será criado um novo registro e adicionado
                // o dado que colidiu, nesse novo registro.
                if (bucketAddressRef.GetIndex() < bucketAddressRef.CapacidadePorBucket)
                {
                    bucketAddressRef.AddRegistro(key, page);
                }
                else
                {
                    numeroOverflows++;

                    bucketAddressRef.Next = new Bucket(registrosPorBucket);
                    bucketAddressRef = bucketAddressRef.Next;

                    bucketAddressRef.AddRegistro(key, page);
                }
            }

            numeroElementosAdicionados++;
        }

        // Função Hash que será utilizada para determinar qual bucket será selecionado
        private int FuncaoHash(string key)
        {
            int keyNumber = ToNumber(key);
            int hashValue = (keyNumber + 1) % buckets.Length;
            // Console.WriteLine("Buckets Length: " + buckets.Length);
            // Console.WriteLine("FuncaoHash // hash value: " + hashValue);

            return hashValue;
        }

        private int ToNumber(string key)
        {
            char[] chars = key.ToCharArray();
            // StringBuilder auxKey = new StringBuilder("");
            int sum = 0;
            int primeNum = 579;

            // somatório com números primos
            foreach (var c in chars)
            {
                // Console.Write(c + " ");
                sum += c * primeNum;
            }
            // DEBUG:
            // Console.WriteLine();
            // Console.WriteLine("\nToNumber // soma: " + sum);

            return sum;
        }

        public int NumeroOverflows => numeroOverflows;
        public int NumeroColisoes => numeroColisoes;
        public int NumeroElementosAdicionados => numeroElementosAdicionados;

        public Bucket[] Buckets => buckets;
    }
}
