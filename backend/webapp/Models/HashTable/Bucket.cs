using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace webapp.Models.HashTable
{
    public class Bucket
    {
        // key = Valor de Hash
        // value = Página
        private Cell<string, int>[] bucket;
        private int index;
        private Bucket next;

        public Bucket(int capacidadeMaxima)
        {
            BucketList = new Cell<string, int>[capacidadeMaxima];
            index = 0;
        }

        public void AddRegistro(string valorHashKey, int pagina)
        {
            try
            {
                BucketList[index] = new Cell<string, int>(valorHashKey, pagina);
                index++;
            }
            catch (IndexOutOfRangeException) // ALGORITMO DE RESOLUÇÃO DE OVERFLOW E COLISÕES #1
            {
                // Debug:
                // Console.WriteLine("\n\n----> COLISÃO!!!!!\n\n");
                throw;
            }
        }

        public int? GetWordPage(string word)
        {
            int? wordPage = null;

            foreach (var item in BucketList)
            {
                if (item != null && item.HashValue.Equals(word))
                {
                    wordPage = item.Pagina;
                    return wordPage;
                }
            }

            throw new IndexOutOfRangeException();
        }

        public bool Contains(string word)
        {
            bool wordExists = false;

            foreach (var item in BucketList)
            {
                if (item != null && item.HashValue.Equals(word))
                {
                    wordExists = true;
                    break;
                }
            }

            return wordExists;
        }

        public Cell<string, int> GetRegistro(int index)
        {
            return BucketList[index];
        }

        public int CapacidadePorBucket => BucketList.Length;

        public Cell<string, int>[] BucketList
        {
            get => bucket;
            set => bucket = value;
        }
        public Bucket Next
        {
            get => next;
            set => next = value;
        }

        public int GetIndex() => index;
    }
}
