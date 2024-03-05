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

        public Book(double quantidadeRegistros, double registrosPorPagina)
        {
            // DEBUG:
            // Console.WriteLine(quantidadeRegistros);
            // Console.WriteLine(registrosPorPagina);

            globalIndex = 0;

            // Obs: 'quantidadeRegistros' é equivalente ao tamanho do Array com os registros
            int quantidadePaginas = (int)Math.Round(quantidadeRegistros / registrosPorPagina);
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
            Console.WriteLine(page);
            pages[globalIndex] = page;
            globalIndex++;
        }

        public Page[] Pages
        {
            get => pages;
            set => pages = value;
        }

        public int QuantidadePaginas => pages.Length;

        public int QuantidadeRegistrosPagina => pages[0].QuantidadeRegistros;
    }
}
