using System.Collections;
using System.Diagnostics;
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
    private Stopwatch watch;

    int parameter = 100;

    // public HashController()
    // : base(client) { }

    // InitBook
    /// <summary>
    /// Método prioritário. Deve ser o <b>PRIMEIRO</b> método a ser chamado
    /// </summary>
    /// <returns>Lista de páginas baseada no input do arquivo TXT</returns>
    [HttpPost("book/{qntRegs:int}")]
    public ActionResult<Book> InitBook(int qntRegs)
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
        book = new Book(lines.Length, qntRegs);

        // DEBUG:
        // Console.WriteLine(book.QuantidadePaginas);

        for (int i = 0; i < lines.Length; i += book.Pages[0].QuantidadeRegistros)
        {
            Page page = new Page(lines.Skip(i).Take(qntRegs).ToArray());
            book.AddPage(page);
        }

        // DEBUG:
        // Console.WriteLine(book.QuantidadePaginas);

        // Init hash table
        // TODO: Criar um atributo de Query String que torne esse "10" alterável
        InitHashTable(lines, qntRegs);

        return book;
    }

    [HttpPost("table/{qntRegs:int}")]
    public ActionResult<HashTable> InitHashTable(string[] lines, int qntRegs)
    {
        hashTable = new HashTable(lines.Length, qntRegs);

        return hashTable;
    }

    /// <summary>
    /// Método prioritário. Deve ser o <b>SEGUNDO</b> método a ser chamado
    /// </summary>
    /// <returns>Tabela Hash com os valores e índices baseados no input do arquivo TXT</returns>
    [HttpPost("fill")]
    public ActionResult<HashTable> FillHashTable()
    {
        if (!IsHashTableEmpty())
            return hashTable;

        for (int i = 0; i < book.Pages.Length; i++)
        {
            for (int j = 0; j < book.Pages[i].WordsList.Length; j++)
            {
                string word = book.Pages[i].WordsList[j];

                hashTable.InsertBucket(word, i);
            }
        }

        return hashTable;
    }

    [HttpGet("book")]
    public ActionResult<Book> GetBook()
    {
        return book;
    }

    [HttpGet("book/{id:int}")]
    public ActionResult<Page> GetPageById(int id)
    {
        return book.Pages[id];
    }

    [HttpGet("table")]
    public ActionResult<HashTable> GetHashTable() => hashTable;

    [HttpGet("table/{id:int}")]
    public ActionResult<Bucket> GetBucketById(int id) => hashTable.Buckets[id];

    [HttpGet("{word}")]
    public ActionResult<string> GetWordByHashindex(string word)
    {
        watch = new Stopwatch();
        string formatTimeSpan = null;
        watch.Start();

        int? foundWordPage = null;
        string? foundWord = null;
        int costCount = 1;

        try
        {
            foundWordPage = hashTable.SearchWordPage(word, ref costCount);

            Page page = book.Pages[(int)foundWordPage];

            foreach (var item in page.WordsList)
            {
                if (item.Equals(word))
                {
                    foundWord = word;
                    break;
                }
            }
        }
        catch (NullReferenceException)
        {
            watch.Stop();
            formatTimeSpan = FormatedTimeSpan();

            return NotFound(
                new
                {
                    status = 404,
                    description = "Erro - Palavra Não Econtrada",
                    searchWord = word,
                    message = $"Não foi possível encontrar a palavra \"{word}\" no Bucket atual. Verifique a entrada solicitada e Tente novamente.",
                    runtime = formatTimeSpan,
                    costEstimate = costCount
                }
            );
        }

        watch.Stop();
        formatTimeSpan = FormatedTimeSpan();

        // "foundWord" captalizado para fins de DEBUG
        return foundWord != null
            ? Ok(
                new
                {
                    status = 200,
                    description = "Palavra Encontrada",
                    searchWord = foundWord,
                    wordPage = foundWordPage,
                    message = $"A palavra \"{foundWord.ToUpper()}\" foi encontrada no Bucket Atual",
                    runtime = formatTimeSpan,
                    costEstimate = costCount
                }
            )
            : NoContent();
    }

    [HttpGet("first/{quantity:int}")]
    public ActionResult<string[]> GetFirstTuples(int quantity)
    {
        watch = new Stopwatch();
        string formatTimeSpan = null;

        string[] xFirstTuples = new string[quantity];

        int i = 0;
        int costCount = 1;

        foreach (var page in book.Pages)
        {
            foreach (var wordInList in page.WordsList)
            {
                if (i >= quantity)
                    break;

                xFirstTuples[i] = wordInList;
                i++;
            }

            if (i >= quantity)
                break;

            costCount++;
        }

        watch.Stop();
        formatTimeSpan = FormatedTimeSpan();

        return xFirstTuples != null
            ? Ok(
                new
                {
                    status = 200,
                    searchTuplesQuantity = quantity,
                    costEtimate = costCount,
                    runtime = formatTimeSpan,
                    xFirstTuples = xFirstTuples
                }
            )
            : NoContent();
    }

    [HttpGet("common/{word}")]
    public ActionResult<string> GetWordCommon(string word)
    {
        watch = new Stopwatch();
        string formatTimeSpan = null;

        watch.Start();

        string foundWord = null;
        int costCount = 1;
        int foundWordPage = 0;

        foreach (var page in book.Pages)
        {
            foreach (var wordInList in page.WordsList)
            {
                if (wordInList.Equals(word))
                {
                    foundWord = wordInList;
                    break;
                }
            }

            costCount++;
            foundWordPage++;
        }

        watch.Stop();
        formatTimeSpan = FormatedTimeSpan();

        return foundWord != null
            ? Ok(
                new
                {
                    status = 200,
                    foundWord = foundWord,
                    page = foundWordPage,
                    searchTuplesQuantity = costCount,
                    runtime = formatTimeSpan
                }
            )
            : NoContent();
    }

    // *** UTILs Methods ***
    private string FormatedTimeSpan()
    {
        TimeSpan ts = watch.Elapsed;
        return String.Format(
            "{0:00}:{1:00}:{2:00}.{3:00}{4:00}ms",
            ts.Hours,
            ts.Minutes,
            ts.Seconds,
            ts.Milliseconds,
            ts.Microseconds,
            ts.Nanoseconds
        );
    }

    private bool IsHashTableEmpty()
    {
        bool flag = true;

        for (int i = 0; i < hashTable.Buckets.Length; i++)
        {
            if (hashTable.Buckets[i] != null)
            {
                flag = false;
                break;
            }
        }

        return flag;
    }
}
