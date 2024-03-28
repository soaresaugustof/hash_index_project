using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Book
    {
        private int globalIndex;
        private Page[] pages;
        private int quantidadePaginas;

        public Book(double quantidadeRegistros, double registrosPorPagina)
        {
            // DEBUG:
            // Console.WriteLine(quantidadeRegistros);
            // Console.WriteLine(registrosPorPagina);

            globalIndex = 0;

            // Obs: 'quantidadeRegistros' é equivalente ao tamanho do Array com os registros
            this.quantidadePaginas = (int)Math.Ceiling(quantidadeRegistros / registrosPorPagina);
            Pages = new Page[quantidadePaginas];
        }

        public string PrintPage()
        {
            string print = "[]";

            foreach (var page in pages)
            {
                foreach (var word in page.WordsList)
                {
                    Console.WriteLine(word);
                }
            }

            return print;
        }

        public void AddPage(Page page)
        {
            if (globalIndex < pages.Length)
            {
                pages[globalIndex] = page;
                globalIndex++;
            }
        }

        public int QuantidadePaginas => pages.Length;

        public int QuantidadeRegistrosPagina => pages[0].QuantidadeRegistros;

        public Page[] Pages
        {
            get => pages;
            set => pages = value;
        }
    }
}
