using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    // A ideia da página é que seja uma estrutura com um limite de tuplas por página

    public class Page
    {
        private string[] wordsList;

        public Page(string[] words)
        {
            WordsList = words.ToArray();
        }

        public string[] WordsList
        {
            get => wordsList;
            set => wordsList = value;
        }
        public int QuantidadeRegistros
        {
            get => wordsList.Length;
        }
    }
}
