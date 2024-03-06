using System.Text;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using webapp.Models.HashTable;

namespace webapp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HashController : ControllerBase
{
    private readonly string projectPath = Environment.CurrentDirectory;
    private static Book? book;
    private static HashTable? hashTable;

    // InitBook
    [HttpPost]
    public ActionResult<Page[]> InitBookAndHashTable()
    {
        // InitBook
        // 1. Stream Reader lê o arquivo e preenche um array com ele
        // Console.WriteLine(projectPath);

        string[] lines;
        var list = new List<string>();
        var fileStream = new FileStream(
            $"{projectPath}\\words.txt",
            FileMode.Open,
            FileAccess.Read
        );

        using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
        {
            string line;

            while ((line = streamReader.ReadLine()) != null)
            {
                list.Add(line);
            }
        }

        lines = list.ToArray();

        // 2. Cria a entidade Book baseada no valor do tamanho do Array
        // TODO: Criar um atributo de Query String que torne esse "100" alterável
        book = new Book(lines.Length, 100);

        // DEBUG:
        // Console.WriteLine(book.QuantidadePaginas);

        for (int i = 0; i < lines.Length; i += book.Pages[0].QuantidadeRegistros)
        {
            Page page = new(lines.Skip(i).Take(100).ToArray());
            book.AddPage(page);
        }

        // DEBUG:
        // Console.WriteLine(book.QuantidadePaginas);

        // Init hash table
        // TODO: Criar um atributo de Query String que torne esse "2" alterável
        hashTable = new HashTable(lines.Length, 2);

        return book.Pages;
    }

    [HttpGet("book")]
    public ActionResult<Book> GetBook()
    {
        return book;
    }

    [HttpGet("table")]
    public ActionResult<HashTable> GetHashTable()
    {
        return hashTable;
    }
}
