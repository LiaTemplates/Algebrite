<!--

author:   André Dietrich
email:    andre.dietrich@ovgu.de
version:  1.0.0
language: en
narrator: US English Female

script:   https://cdn.rawgit.com/davidedc/Algebrite/master/dist/algebrite.bundle-for-browser.js

@eval:    <script> Algebrite.run(`@code`) </script>

-->

# Algebrite-Template

Template for the Algebrite JavaScript Computer-Algebra-System (CAS)
http://algebrite.org

See the rendered version [here](https://liascript.github.io/course/?https://raw.githubusercontent.com/liaScript/algebrite_template/master/README.md).

Algebrite is...

* __lightweight__:    made to be simple to comprehend and extend, it only
                      depends on [BigInteger.js by Peter Olson](https://github.com/peterolson/BigInteger.js).
* __self-contained__: doesn't need connection to servers or another "backend" CAS
* __a library__:      beyond use as an interactive tool, Algebrite can be
                      embedded in your applications and extended with custom
                      functions.
* __free__:           MIT-Licenced

Function reference: http://algebrite.org/docs/latest-stable/reference.html


## Examples

These examples are taken from the website http://algebrite.org double-click onto
the listing to edit it.

```Maxima
(3 * x - 5x)^3 * (x + x)

60!
```
@eval

The following example might take a few seconds ...

```Maxima
f=sin(t)^4-2*cos(t/2)^3*sin(t)

f=circexp(f)

defint(f,t,0,2*pi)
```
@eval
