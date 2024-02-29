using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Book
    {
        private Page[] pages;

        public Book(double quantidadeRegistros, double registrosPorPagina)
        {
            int quantidadePaginas = (int) Math.Truncate(quantidadeRegistros / registrosPorPagina);
            Pages = new Page[quantidadePaginas];
        }

        public Page[] Pages { get => pages; set => pages = value; }
        public int quantidadePaginas { get => pages.Length; }
    }
}