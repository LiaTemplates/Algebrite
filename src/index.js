import 'algebrite' // sets globalThis.Algebrite
import AlgebraLatex from 'algebra-latex'

// Characters that look right but Algebrite cannot parse:
// dashes and math minus -> '-', wide underscores -> '_', subscript digits x₁ -> x_1
const SUBSCRIPTS = '₀₁₂₃₄₅₆₇₈₉'
window.normalizeUnicode = function (input) {
  if (!input || typeof input !== 'string') {
    return input
  }
  return input
    .replace(/[‐-―−﹘﹣－]/g, '-')
    .replace(/[＿﹍-﹏]/g, '_')
    .replace(/[₀-₉]+/g, (d) => '_' + [...d].map((c) => SUBSCRIPTS.indexOf(c)).join(''))
    .replace(/\s*_\s*/g, '_')
}

window.latexToMath = function (input) {
  input = window.normalizeUnicode(input)
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
