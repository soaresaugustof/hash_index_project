using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HashController : ControllerBase
    {
        private readonly string projectPath = AppDomain.CurrentDomain.BaseDirectory;

        // InitBook
        [HttpPost]
        public void InitBook()
        {
            Console.WriteLine(projectPath);

            // string[] lines;
            // var list = new List<string>();
            // var fileStream = new FileStream(
            //     $"{projectPath}\\words.txt",
            //     FileMode.Open,
            //     FileAccess.Read
            // );
        }
    }
}
