<!--
author:   André Dietrich

email:    andre.dietrich@ovgu.de

version:  0.1.1

language: en

narrator: US English Female

comment:  Template for the Algebrite JavaScript Computer-Algebra-System (CAS).

script:   https://cdn.rawgit.com/davidedc/Algebrite/master/dist/algebrite.bundle-for-browser.js

attribute: [Algebrite](http://algebrite.org/)
           by [Davide Della Casa](http://davidedc.com/)
           is licensed under [MIT](https://opensource.org/licenses/MIT)

@Algebrite.eval: <script> Algebrite.run(`@input`) </script>
-->

# Algebrite - Template

                         --{{0}}--
Template for the Algebrite JavaScript Computer-Algebra-System (CAS)
http://algebrite.org to be used in [LiaScript](https://LiaScript.github.io) to
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
1. Load the macros via

   `import: https://raw.githubusercontent.com/liaTemplates/algebrite/master/README.md`

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


## Implementation

                         --{{0}}--
Compared to other macros, using Algebrite is actually quite simple. The two
lines below are sufficient, the first one


``` html
script: https://cdn.rawgit.com/davidedc/Algebrite/master/dist/algebrite.bundle-for-browser.js

@Algebrite.eval: <script> algebrite.run(`@input`) </script>
```

                         --{{1}}--
If you want to minimize loading effort in your LiaScript project, you can also
copy this code and paste it into your main comment header, see the code in the
raw file of this document.

{{1}} https://raw.githubusercontent.com/liaTemplates/algebrite/master/README.md
