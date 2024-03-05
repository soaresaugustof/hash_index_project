using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapp.Models.HashTable
{
    public class Bucket
    {
        // key = Valor de Hash
        // value = Página
        private Dictionary<double, int> bucket;
        private Bucket next;
    }
}
