<!--
author:   André Dietrich

email:    andre.dietrich@ovgu.de

version:  0.6.0

language: en

edit:     true

narrator: US English Female

logo:     https://live.staticflickr.com/7327/11125348744_2a75b75427_b.jpg

comment:  Template for the Algebrite JavaScript Computer-Algebra-System (CAS).

script:   dist/index.js

attribute: [Algebrite](http://algebrite.org/)
           by [Davide Della Casa](http://davidedc.com/)
           is licensed under [MIT](https://opensource.org/licenses/MIT)

@onload
window.inputClean = function(input) {
  const commas = [",", "‚", "﹐", "，", "､"];
  for(let i=0; i<commas.length; i++) {
    input = input.replace(new RegExp("\\" + commas[i], "g"), ".");
    input = input.replace(/(\d+(?:\.\d+)?)\s*%/g, (_, num) => (parseFloat(num) / 100).toString());
  }

  input = input.replace(/\\/g, "/");

  return input;
}
@end

@Algebrite.eval: <script> window.Algebrite.run(`@input`) </script>

@Algebrite.check: <script>
  let input = `@'input`;
  
  try {
    const json = JSON.parse(input);
    if (typeof json === "string") {
      input = [json.trim()];
    } else {
      input = json.map(item => item.trim());
    }
  } catch (e) {
    input = [input.trim()];
  }

  if (input.length == 0) {
    send.lia("No input provided",[],false);
  }

  input = input.map(item => window.latexToMath(item));

  alert("Input after LaTeX conversion: " + JSON.stringify(input));

  let output = "@0".trim();

  if(output.startsWith("[") && output.endsWith("]")) {
    output = output.slice(1, -1).split(";").map(item => item.trim());
  } else {
    output = [output];
  }

  let rslt = true;
  for (let i=0; i<input.length; i++) {
    if (input[i] == "") {
        rslt = false;
        break;
    }
    try {
      let expression = `(${input[i]}) - (${output[i]}) == 0`;
      expression = window.inputClean(expression);
      let result = window.Algebrite.simplify(expression);

      window.console.warn("Result:", result);
      if (!result.q.a || result.q.a.value != 1n ) {
        rslt = false;
        break;
      }
    } catch(e) {
      rslt = false;
      break;
    }
    rslt;
  }
  </script>

@Algebrite.check_expression: <script>
  let input = `@'input`;
  
  try {
    const json = JSON.parse(input);
    if (Array.isArray(json)) {
      input = json[0];
    } 
  } catch (e) {}
  input = input.trim();
  input = window.latexToMath(input);

  if (input.length == 0) {
    send.lia("No input provided",[],false);
  } else {
    try {
      let solution = window.inputClean("@0");
      solution = solution.split("=");
      solution = solution[0] + "-" + solution[1];

      let expression = window.inputClean("@input");
      expression = expression.split("=");

      expression = expression[0] + "-" + expression[1];

      let result = window.Algebrite.run(`${solution} - (${expression})`);

      result == "0";
    } catch(e) {
      false;
    }
  }
  </script>

@Algebrite.check2: <script>
  let input = `@'input`;
  
  try {
    const json = JSON.parse(input);
    if (typeof json === "string") {
      input = [json.trim()];
    } else {
      input = json.map(item => item.trim());
    }
  } catch (e) {
    input = [input.trim()];
  }

  if (input.length == 0) {
    send.lia("No input provided",[],false);
  }

  input = input.map(item => window.latexToMath(item));

  let lowerBounds = "@0".trim();
  let upperBounds = "@1".trim();

  if(lowerBounds.startsWith("[") && lowerBounds.endsWith("]")) {
    lowerBounds = lowerBounds.slice(1, -1).split(";").map(item => item.trim());
  } else {
    lowerBounds = [lowerBounds];
  }

  if(upperBounds.startsWith("[") && upperBounds.endsWith("]")) {
    upperBounds = upperBounds.slice(1, -1).split(";").map(item => item.trim());
  } else {
    upperBounds = [upperBounds];
  }

  let rslt = true;
  for (let i=0; i<input.length; i++) {
    if (input[i] == "") {
        rslt = false;
        break;
    }
    try {
      let expression = `abs((${input[i]}) - (${lowerBounds[i]})) < ${upperBounds[i]}`;
      expression = window.inputClean(expression);
      let result = window.Algebrite.simplify(expression);

      window.console.warn("Result:", result);
      if (!result.q.a || result.q.a.value != 1n ) {
        rslt = false;
        break;
      }
    } catch(e) {
      rslt = false;
      break;
    }
    rslt;
  }
  </script>

@Algebrite.check_margin: <script>
  let input = `@input`; 
  try {
    const json = JSON.parse(input);
    if (Array.isArray(json)) {
      input = json[0];
    } 
  } catch (e) {}

  input = input.trim();

  if (input.length == 0) {
    send.lia("No input provided",[],false);
  } else {
    try {
      let expression = window.inputClean(window.latexToMath(input));
      expression = `and((@0) <= (${expression}), (${expression}) <= (@1))`;
      let result = window.Algebrite.simplify(expression);
      result == "1";
    } catch(e) {
      false;
    }
  }
  </script>

-->

# Algebrite - Template



                         --{{0}}--
Template for the Algebrite JavaScript Computer-Algebra-System (CAS)
https://algebrite.org to be used in [LiaScript](https://LiaScript.github.io) to
make Markdown code-blocks executable.

__Try it on LiaScript:__

https://liascript.github.io/course/?https://raw.githubusercontent.com/liaTemplates/algebrite/master/README.md

__See the project on Github:__

https://github.com/liaTemplates/algebrite

                         --{{1}}--
Like with other LiaScript templates, there are three ways to integrate
Algebrite, but the easiest way is to copy the defintion from
[Sec. Implementation](#4).

                           {{1}}
1. Load the latest macros via (this might cause breaking changes)

   `import: https://raw.githubusercontent.com/liaTemplates/algebrite/master/README.md`

   or the current version 0.6.0 via:

   `import: https://raw.githubusercontent.com/LiaTemplates/algebrite/0.6.0/README.md`

2. __Copy the definitions into your Project__

3. Clone this repository on GitHub


## More Information

Algebrite is...

* __lightweight__:    made to be simple to comprehend and extend, it only
                      depends on [BigInteger.js by Peter Olson](https://github.com/peterolson/BigInteger.js).
* __self-contained__: doesn't need connection to servers or another "backend" CAS
* __a library__:      beyond use as an interactive tool, Algebrite can be
                      embedded in your applications and extended with custom
                      functions.
* __free__:           MIT-Licenced

Function reference: http://algebrite.org/docs/latest-stable/reference.html


## `@Algebrite.eval`

These examples are taken from the website http://algebrite.org double-click onto
the listing to edit it.

``` Maxima
(3 * x - 5x)^3 * (x + x)

60!
```
@Algebrite.eval

The following example might take a few seconds ...

```Maxima
f=sin(t)^4-2*cos(t/2)^3*sin(t)

f=circexp(f)

defint(f,t,0,2*pi)
```
@Algebrite.eval

## Quizzes

### `@Algebrite.check`

                         --{{0}}--
Using the `@Algebrite.check` macro, you can combine this with quizzes, to compare the result of an expression with a given value with different expressions. You can for 


```
6 + 6

[[12]]
@Algebrite.check(12)
```

                          --{{1}}--
Try out different results like `12,0`, `3*4`, etc.

    {{1}}
<div>

6 + 6

[[12]]
@Algebrite.check(12)

----

</div>



                         --{{2}}--
The same can be done with more complex expressions, try different expressions of `x ^ 2 - 1` like `-1 + x * x`.


    {{2}}
<div>

```
[[x ^ 2 - 1]]
@Algebrite.check(x^2-1)
```

----

[[x ^ 2 - 1]]
@Algebrite.check(x^2-1)

</div>


    {{3}}
$x=\;$ [[ 2/5 ]] $\;\;\wedge\;\; y=$  [[ 5/7 ]] $\;\;\wedge\;\; z=$  [[ 3/4 ]]
@Algebrite.check([ 2/5; 5/7; 3/4 ])

### `@Algebrite.check2`

                         --{{0}}--
If your result might need to cope with some rounding errors, you can use the
`@Algebrite.check2` macro, which allows you to define a tolerance value as the second parameter.

<div>

```
[[1/3]]
@Algebrite.check2(1/3,0.01)
```

----

[[1/3]]
@Algebrite.check2(1/3,0.01)

</div>

                        --{{1}}--
If you need more inputs, you can also provide lists of values as input and output:

    {{1}}
```
$a=$ [[ 1/3 ]]\
$b=$ [[ 2/3 ]]\
$c=$ [[ 3/3 ]]
@Algebrite.check2([ 1/3 ; 2/3 ; 3/3 ], [0.01 ; 0.01 ; 0.01])
```

    {{1}}
$a=$ [[ 1/3 ]]\
$b=$ [[ 2/3 ]]\
$c=$ [[ 3/3 ]]
@Algebrite.check2([ 1/3 ; 2/3 ; 3/3 ], [0.01 ; 0.01 ; 0.01])



### `@Algebrite.check_margin`

                         --{{0}}--
The `@Algebrite.check_margin` macro allows you to check if a value is within a certain range. This is useful for checking if a result is within a certain margin of error, while the first parameter defines the lower bound and the second parameter defines the upper bound.


```
-> [[ 1.5 ]] $km$
@Algebrite.check_margin(1.4, 1.6)
```

-> [[ 1.5 ]] $km$
@Algebrite.check_margin(1.4, 1.6)

### `@Algebrite.check_expression`

                          --{{0}}--
To check if an expression is equal to another expression, you can use the `@Algebrite.check_expression` macro.

```
[[x ^ 2 - 1 = 2x]]
@Algebrite.check_expression(x^2-1-2x=0)
```

----

[[x ^ 2 - 1 = 2x]]
@Algebrite.check_expression(x^2-1-2x=0)


## Implementation

                         --{{0}}--
Compared to other macros, using Algebrite is actually quite simple. The two
lines below are sufficient, the first one


``` html
script:   dist/index.js

@onload
window.inputClean = function(input) {
  const commas = [",", "‚", "﹐", "，", "､"];
  for(let i=0; i<commas.length; i++) {
    input = input.replace(new RegExp("\\" + commas[i], "g"), ".");
    input = input.replace(/(\d+(?:\.\d+)?)\s*%/g, (_, num) => (parseFloat(num) / 100).toString());
  }

  input = input.replace(/\\/g, "/");

  return input;
}
@end

@Algebrite.eval: <script> window.Algebrite.run(`@input`) </script>

@Algebrite.check: <script>
  let input = `@'input`;
  
  try {
    const json = JSON.parse(input);
    if (typeof json === "string") {
      input = [json.trim()];
    } else {
      input = json.map(item => item.trim());
    }
  } catch (e) {
    input = [input.trim()];
  }

  if (input.length == 0) {
    send.lia("No input provided",[],false);
  }

  input = input.map(item => window.latexToMath(item));

  alert("Input after LaTeX conversion: " + JSON.stringify(input));

  let output = "@0".trim();

  if(output.startsWith("[") && output.endsWith("]")) {
    output = output.slice(1, -1).split(";").map(item => item.trim());
  } else {
    output = [output];
  }

  let rslt = true;
  for (let i=0; i<input.length; i++) {
    if (input[i] == "") {
        rslt = false;
        break;
    }
    try {
      let expression = `(${input[i]}) - (${output[i]}) == 0`;
      expression = window.inputClean(expression);
      let result = window.Algebrite.simplify(expression);

      window.console.warn("Result:", result);
      if (!result.q.a || result.q.a.value != 1n ) {
        rslt = false;
        break;
      }
    } catch(e) {
      rslt = false;
      break;
    }
    rslt;
  }
  </script>

@Algebrite.check_expression: <script>
  let input = `@'input`;
  
  try {
    const json = JSON.parse(input);
    if (Array.isArray(json)) {
      input = json[0];
    } 
  } catch (e) {}
  input = input.trim();
  input = window.latexToMath(input);

  if (input.length == 0) {
    send.lia("No input provided",[],false);
  } else {
    try {
      let solution = window.inputClean("@0");
      solution = solution.split("=");
      solution = solution[0] + "-" + solution[1];

      let expression = window.inputClean("@input");
      expression = expression.split("=");

      expression = expression[0] + "-" + expression[1];

      let result = window.Algebrite.run(`${solution} - (${expression})`);

      result == "0";
    } catch(e) {
      false;
    }
  }
  </script>

@Algebrite.check2: <script>
  let input = `@'input`;
  
  try {
    const json = JSON.parse(input);
    if (typeof json === "string") {
      input = [json.trim()];
    } else {
      input = json.map(item => item.trim());
    }
  } catch (e) {
    input = [input.trim()];
  }

  if (input.length == 0) {
    send.lia("No input provided",[],false);
  }

  input = input.map(item => window.latexToMath(item));

  let lowerBounds = "@0".trim();
  let upperBounds = "@1".trim();

  if(lowerBounds.startsWith("[") && lowerBounds.endsWith("]")) {
    lowerBounds = lowerBounds.slice(1, -1).split(";").map(item => item.trim());
  } else {
    lowerBounds = [lowerBounds];
  }

  if(upperBounds.startsWith("[") && upperBounds.endsWith("]")) {
    upperBounds = upperBounds.slice(1, -1).split(";").map(item => item.trim());
  } else {
    upperBounds = [upperBounds];
  }

  let rslt = true;
  for (let i=0; i<input.length; i++) {
    if (input[i] == "") {
        rslt = false;
        break;
    }
    try {
      let expression = `abs((${input[i]}) - (${lowerBounds[i]})) < ${upperBounds[i]}`;
      expression = window.inputClean(expression);
      let result = window.Algebrite.simplify(expression);

      window.console.warn("Result:", result);
      if (!result.q.a || result.q.a.value != 1n ) {
        rslt = false;
        break;
      }
    } catch(e) {
      rslt = false;
      break;
    }
    rslt;
  }
  </script>

@Algebrite.check_margin: <script>
  let input = `@input`; 
  try {
    const json = JSON.parse(input);
    if (Array.isArray(json)) {
      input = json[0];
    } 
  } catch (e) {}

  input = input.trim();

  if (input.length == 0) {
    send.lia("No input provided",[],false);
  } else {
    try {
      let expression = window.inputClean(window.latexToMath(input));
      expression = `and((@0) <= (${expression}), (${expression}) <= (@1))`;
      let result = window.Algebrite.simplify(expression);
      result == "1";
    } catch(e) {
      false;
    }
  }
  </script>
```

                         --{{1}}--
If you want to minimize loading effort in your LiaScript project, you can also
copy this code and paste it into your main comment header, see the code in the
raw file of this document.

{{1}} https://raw.githubusercontent.com/liaTemplates/algebrite/master/README.md
