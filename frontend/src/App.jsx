import './App.css'
import React, { useState } from 'react';
import icon from './assets/icon.png'

const schema = {
  BD_Vendas: {
    Categoria: {
      columns: ["idCategoria", "Descricao"],
      primaryKey: "idCategoria",
    },
    Produto: {
      columns: [
        "idProduto",
        "Nome",
        "Descricao",
        "Preco",
        "QuantEstoque",
        "Categoria_idCategoria",
      ],
      primaryKey: "idProduto",
      foreignKeys: { Categoria_idCategoria: "Categoria" },
    },
    TipoCliente: {
      columns: ["idTipoCliente", "Descricao"],
      primaryKey: "idTipoCliente",
    },
    Cliente: {
      columns: [
        "idCliente",
        "Nome",
        "Email",
        "Nascimento",
        "Senha",
        "TipoCliente_idTipoCliente",
        "DataRegistro",
      ],
      primaryKey: "idCliente",
      foreignKeys: { TipoCliente_idTipoCliente: "TipoCliente" },
    },
  },
};

function parseSQLQuery(query) {
  // Improved regex patterns
  const regex = {
    select: /SELECT\s+(.+?)\s+FROM\s+/is,
    from: /FROM\s+([\w\s]+?)(?:\s+JOIN|\s+WHERE|$)/i,
    join: /JOIN\s+([\w\s]+?)\s+ON\s+([\w\s\.\=\>\<\('\"]+)/gi,
    where: /WHERE\s+([\w\s\.\=\>\<\('\"]+)/i,
  };

  // Helper function to parse the WHERE clause into a structured format
  function parseWhereCondition(condition) {
    // Updated to handle quotes better and distinguish values from column names
    const conditionRegex = /(\w+)\s*(=|>|<|>=|<=|<>)\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\w+)/g;
    let match;
    const conditions = [];

    while ((match = conditionRegex.exec(condition)) !== null) {
      conditions.push({
        leftOperand: match[1],
        operator: match[2],
        rightOperand: match[3],
        isLiteral: match[3].startsWith("'") || match[3].startsWith('"') // Check if the right operand is a literal
      });
    }
    return conditions;
  }

  // Extract different parts using the regular expressions
  const selectMatch = query.match(regex.select);
  const fromMatch = query.match(regex.from);
  const whereMatch = query.match(regex.where);

  let joins = [];
  let joinMatch;
  while ((joinMatch = regex.join.exec(query)) !== null) {
    joins.push({
      table: joinMatch[1].trim(),
      condition: parseWhereCondition(joinMatch[2]),
    });
  }

  // Build the result object
  const result = {
    select: selectMatch
      ? selectMatch[1].split(",").map((s) => s.trim())
      : [],
    from: fromMatch ? fromMatch[1].trim() : null,
    joins: joins,
    where: whereMatch ? parseWhereCondition(whereMatch[1]) : [],
  };

  return result;
}

// Example SQL query
const exampleQuery = `
SELECT idCliente, Nome, Email
FROM Cliente
JOIN TipoCliente ON Cliente.TipoCliente_idTipoCliente = TipoCliente.idTipoCliente
WHERE Nome = 'John Doe'
`;

// Parse the query
const parsedQuery = parseSQLQuery(exampleQuery);

console.log(parsedQuery);
console.log(parsedQuery.joins[0].condition);

function validateQuery(parsedQuery, schema) {
  let errors = [];

  // Validate FROM table
  const fromTable = parsedQuery.from;
  if (!schema[fromTable]) {
    errors.push(` Table '${fromTable}' does not exist.`);
  } else {
    // Validate SELECT columns
    parsedQuery.select.forEach((column) => {
      if (!schema[fromTable].columns.includes(column)) {
        errors.push(` Column '${column}' does not exist in table '${fromTable}'.`);
      }
    });

    // Validate WHERE conditions
    parsedQuery.where.forEach((cond) => {
      if (!schema[fromTable].columns.includes(cond.leftOperand)) {
        errors.push(` Column '${cond.leftOperand}' in WHERE condition does not exist in table '${fromTable}'.`);
      }
      // Check if the right operand should be a column name
      if (!cond.isLiteral && !schema[fromTable].columns.includes(cond.rightOperand)) {
        errors.push(` Column '${cond.rightOperand}' does not exist in table '${fromTable}'.`);
      }
    });
  }

  // Validate JOINs
  parsedQuery.joins.forEach((join) => {
    const joinTable = join.table;
    if (!schema[joinTable]) {
      errors.push(` Join table '${joinTable}' does not exist.`);
    } else {
      join.condition.forEach((cond) => {
        // Validate the foreign key relationship
        if (!schema[fromTable].columns.includes(cond.leftOperand)) {
          errors.push(` Foreign key '${cond.leftOperand}' does not exist in '${fromTable}'.`);
        }
        // Check if right operand is a literal or a column name
        if (!cond.isLiteral && (cond.rightOperand !== joinTable && !schema[joinTable].columns.includes(cond.rightOperand))) {
          errors.push(` Column '${cond.rightOperand}' does not exist in table '${joinTable}'.`);
        }
      });
    }
  });

  return errors.length > 0 ? errors : " No errors found. The query is valid.";
}

// Run the validation
const validationResult = validateQuery(parsedQuery, schema.BD_Vendas);
console.log(validationResult);

function App() {
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState('');
  const [displayFeedback, setDisplayFeedback] = useState('');
  const [displayHeading, setDisplayHeading] = useState('');

  const animateText = (text, setter) => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < text.length - 1) { // Ensure it doesn't render the last character
        setter(prev => prev + text[i]); // Append the character at the current index
        i++; // Then increment the index
      } else {
        clearInterval(intervalId); // Stop the interval when reaching the second to last character
      }
    }, 50); // Adjust the speed of typing here
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const parsedQuery = parseSQLQuery(query);
      const validationResult = validateQuery(parsedQuery, schema.BD_Vendas);
      const result = Array.isArray(validationResult) ? validationResult.join(', ') : validationResult;

      setFeedback(result);  // This ensures feedback is always set to a defined result
      console.log(result)
      setDisplayFeedback(''); // Reset displayFeedback to avoid stale text

      setTimeout(() => animateText(result, setDisplayFeedback), 500); // Delay the start of the pre text animation
    } catch (error) {
      setFeedback(`Error parsing or validating the query: ${error.message}`);
      setDisplayHeading('');
      setDisplayFeedback('');  // Clear displayFeedback if there is an error
    }
  };

  return (
    <div className="App">
      <img src={icon} style={{ width: 80 }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 className="title">Query Process Simulator</h1>
        <h1 className="title blink">.</h1>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <textarea
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter your SQL query here"
          rows="10"
          cols="70"
        />
        <button type="submit" style={{ width: '30%', marginTop: 20 }} className='button-text'>Validate</button>
      </form>
      {feedback && (
        <div className="typewriter" style={{ marginTop: 50 }}>
          <pre style={{ color: feedback === " No errors found. The query is valid." ? 'lime' : 'red' }}>{displayFeedback}</pre>
        </div>
      )}
    </div>
  );
}

export default App;