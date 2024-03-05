using System.Text;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace webapp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HashController : ControllerBase
{
    private readonly string projectPath = Environment.CurrentDirectory;
    private Book book;

    public HashController() { }

    // InitBook
    [HttpPost]
    public Page[] InitBook()
    {
        // 1. Stream Reader lê o arquivo e preenche um array com ele
        Console.WriteLine(projectPath);

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
        this.book = new Book(lines.Length, 100);

        // DEBUG:
        // Console.WriteLine(this.book.QuantidadePaginas);

        for (int i = 0; i < lines.Length; i += this.book.Pages[0].QuantidadeRegistros)
        {
            Page page = new(lines.Skip(i).Take(100).ToArray());
            this.book.AddPage(page);
        }

        // DEBUG:
        // Console.WriteLine(book.QuantidadePaginas);

        return book.Pages;
    }
}
