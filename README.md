# clownface.io

<!--[![Build Status](https://travis-ci.org/clownface/clownface.svg?branch=master)](https://travis-ci.org/clownface/clownface)-->
<!--[![NPM Version](https://img.shields.io/npm/v/clownface.svg?style=flat)](https://npm.im/clownface)-->

The complete package to get you started with working on RDF based on the simple but powerfull graph traversing library.

This library is based on http://zazuko.github.io/clownface/ and bring all batteries necessary to start accesing and (soon) writing of RDF.

# What does it include already?
* Standard set of libraries shipped with it.
* Parsers included in [RDFJS formats common](https://github.com/rdfjs-base/formats-common).
* RDF accessable through HTTP and file interfaces.
* Can be used without any knowledge about streams, and the underlying stream based libraries.


# What is on a potential roadmap?
* Configurable to change standard set of libraries.
* Full control on error management. (E.g. in case of multiple requests in a chain.)
* Query directly a SPARQL endpoint.
* Resolve resources with multiple strategies (1. Dereference on HTTP, 2. Look for void with SPARQL endpoint).
* Writing to different places (SPARQL endpoint, GraphStore, Serializations).
