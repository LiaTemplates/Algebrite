<!--
author:   André Dietrich

email:    andre.dietrich@ovgu.de

version:  0.3.2

language: en

narrator: US English Female

logo:     https://live.staticflickr.com/7327/11125348744_2a75b75427_b.jpg

comment:  Template for the Algebrite JavaScript Computer-Algebra-System (CAS).

script:   dist/index.js

attribute: [Algebrite](http://algebrite.org/)
           by [Davide Della Casa](http://davidedc.com/)
           is licensed under [MIT](https://opensource.org/licenses/MIT)

@Algebrite.eval: <script> window.Algebrite.run(`@input`) </script>

@Algebrite.check: <script>
  let input = `@input`;
  
  try {
    const json = JSON.parse(input);
    if (Array.isArray(json)) {
      input = json[0];
    } 
  } catch (e) {}

  let expression = `(${input}) - (@0) == 0`;
  expression = expression.replace(/\,/g, ".");
  let result = window.Algebrite.simplify(expression);
  result == "1";
  </script>

@Algebrite.check2: <script>
  let input = `@input`;
  
  try {
    const json = JSON.parse(input);
    if (Array.isArray(json)) {
      input = json[0];
    } 
  } catch (e) {}

  let expression = `abs((${input}) - (@0)) < @1`;
  expression = expression.replace(/\,/g, ".");
  let result = window.Algebrite.simplify(expression);
  result == "1";
  </script>

@Algebrite.check_margin: <script>
  let input = `@input`; 
  try {
    const json = JSON.parse(input);
    if (Array.isArray(json)) {
      input = json[0];
    } 
  } catch (e) {}

  let expression = input.replace(/\,/g, ".");
  expression = `and((@0) <= (${expression}), (${expression}) <= (@1))`;
  let result = window.Algebrite.simplify(expression);
  result == "1";
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

   or the current version 0.3.2 via:

   `import: https://raw.githubusercontent.com/LiaTemplates/algebrite/0.3.2/README.md`

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


### `@Algebrite.check_margin`

                         --{{0}}--
The `@Algebrite.check_margin` macro allows you to check if a value is within a certain range. This is useful for checking if a result is within a certain margin of error, while the first parameter defines the lower bound and the second parameter defines the upper bound.


```
-> [[ 1.5 ]] $km$
@Algebrite.check_margin(1.4, 1.6)
```

-> [[ 1.5 ]] $km$
@Algebrite.check_margin(1.4, 1.6)


## Implementation

                         --{{0}}--
Compared to other macros, using Algebrite is actually quite simple. The two
lines below are sufficient, the first one


``` html
script: dist/index.js

@Algebrite.eval: <script> window.Algebrite.run(`@input`) </script>

@Algebrite.check: <script>
  let input = `@input`;
  
  try {
    const json = JSON.parse(input);
    if (Array.isArray(json)) {
      input = json[0];
    } 
  } catch (e) {}

  let expression = `(${input}) - (@0) == 0`;
  expression = expression.replace(/\,/g, ".");
  let result = window.Algebrite.simplify(expression);
  result == "1";
  </script>

@Algebrite.check2: <script>
  let input = `@input`;
  
  try {
    const json = JSON.parse(input);
    if (Array.isArray(json)) {
      input = json[0];
    } 
  } catch (e) {}

  let expression = `abs((${input}) - (@0)) < @1`;
  expression = expression.replace(/\,/g, ".");
  let result = window.Algebrite.simplify(expression);
  result == "1";
  </script>

@Algebrite.check_margin: <script>
  let input = `@input`; 
  try {
    const json = JSON.parse(input);
    if (Array.isArray(json)) {
      input = json[0];
    } 
  } catch (e) {}

  let expression = input.replace(/\,/g, ".");
  expression = `and((@0) <= (${expression}), (${expression}) <= (@1))`;
  let result = window.Algebrite.simplify(expression);
  result == "1";
  </script>
```

                         --{{1}}--
If you want to minimize loading effort in your LiaScript project, you can also
copy this code and paste it into your main comment header, see the code in the
raw file of this document.

{{1}} https://raw.githubusercontent.com/liaTemplates/algebrite/master/README.md
