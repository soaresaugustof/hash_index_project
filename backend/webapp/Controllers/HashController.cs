using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace webapp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HashController : ControllerBase
{
    private readonly string projectPath = Environment.CurrentDirectory;

    public HashController() { }

    // InitBook
    [HttpPost]
    public void InitBook()
    {
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
    }
}
