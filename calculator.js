// calculator.js
// Repeatedly prompts the user for two numbers and an operator,
// computes the result, and builds an HTML table of all attempts
// plus a summary table of the valid results.

// Arrays to keep track of everything we need for the summary table
var validResults = [];

// Rows for the detail table get built up as a string
var tableRows = "";

// Main input loop
while (true) {

  // 1. Prompt for the first number
  var xInput = prompt("Enter the first number (x):");
  if (xInput === null) {
    break; // user clicked Cancel
  }

  // 2. Prompt for the second number
  var yInput = prompt("Enter the second number (y):");
  if (yInput === null) {
    break; // user clicked Cancel
  }

  // 3. Prompt for the operator
  var operator = prompt("Enter an operator (+, -, *, /, %):");
  if (operator === null) {
    break; // user clicked Cancel
  }

  // Convert the number inputs to actual numbers
  var x = Number(xInput);
  var y = Number(yInput);

  var result; // will hold either a numeric result or an error message

  // Validate x and y are numeric
  if (isNaN(x) || isNaN(y)) {
    result = "Error: x and/or y is not a number";
  } else {
    // Validate the operator and compute the result
    switch (operator) {
      case "+":
        result = x + y;
        break;
      case "-":
        result = x - y;
        break;
      case "*":
        result = x * y;
        break;
      case "/":
        if (y === 0) {
          result = "Error: division by zero";
        } else {
          result = x / y;
        }
        break;
      case "%":
        if (y === 0) {
          result = "Error: modulus by zero";
        } else {
          result = x % y;
        }
        break;
      default:
        result = "Error: invalid operator";
    }
  }

  // If result is a plain number, remember it for the summary stats
  if (typeof result === "number") {
    validResults.push(result);
  }

  // Decide whether to style this row's result cell as an error
  var isError = typeof result === "string";
  var resultCell = isError
    ? "<td class=\"error\">" + result + "</td>"
    : "<td>" + result + "</td>";

  // Build the row and append it to our running table string
  tableRows += "<tr><td>" + xInput + "</td><td>" + operator +
    "</td><td>" + yInput + "</td>" + resultCell + "</tr>";
}

// ---- Detail table: every attempt, valid or not ----
document.write("<h2>Calculation History</h2>");

if (tableRows === "") {
  document.write("<p>No calculations were entered.</p>");
} else {
  document.write("<table>");
  document.write("<tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr>");
  document.write(tableRows);
  document.write("</table>");
}

// ---- Summary table: min, max, average, total of valid results ----
document.write("<h2>Summary of Valid Results</h2>");

if (validResults.length === 0) {
  document.write("<p>No valid results to summarize.</p>");
} else {
  var min = Math.min.apply(null, validResults);
  var max = Math.max.apply(null, validResults);
  var total = validResults.reduce(function (sum, val) {
    return sum + val;
  }, 0);
  var avg = total / validResults.length;

  document.write("<table>");
  document.write("<tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>");
  document.write("<tr><td>" + min + "</td><td>" + max + "</td><td>" +
    avg.toFixed(2) + "</td><td>" + total + "</td></tr>");
  document.write("</table>");
}