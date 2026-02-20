window.Algebrite = require('algebrite')
import AlgebraLatex from 'algebra-latex'

window.latexToMath = function (input) {
  if (!input || typeof input !== 'string') {
    return input
  }

  // Check if input contains LaTeX commands (backslash followed by letters)
  if (/\\[a-zA-Z]+/.test(input)) {
    try {
      // Use AlgebraLatex to convert LaTeX to math notation
      const parsed = new AlgebraLatex().parseLatex(input)
      const expr = parsed.toAlgebrite(Algebrite) // returns something Algebrite understands
      return String(expr)
    } catch (e) {
      // If conversion fails, return original input
      window.console.warn('LaTeX conversion failed:', e)
      return input
    }
  }

  return input
}
