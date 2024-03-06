using System;
using System.Collections.Generic;
using System.Linq;
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
        public void InsertBucket( /* chave */
        )
        {
            int indiceHash =
                FuncaoHash( /* chave */
                );
            buckets[indiceHash] = new Bucket(registrosPorBucket);
        }

        // Função Hash que será utilizada para determinar qual bucket será selecionado
        private int FuncaoHash( /* chave */
        )
        {
            //TODO: Criar a funcao hash
            return 0;
        }

        public Bucket[] Buckets { get; }
    }
}
