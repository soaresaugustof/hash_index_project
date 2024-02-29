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

        public Page(int quantidadeRegistros)
        {
            WordsList = new string[quantidadeRegistros];
        }

        public string[] WordsList { get => wordsList; set => wordsList = value; }
    }
}