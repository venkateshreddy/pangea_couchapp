## Generated CouchApp

This is meant to be an example CouchApp and to ship with most of the CouchApp goodies.

Clone with git:

    git clone https://github.com/venkateshreddy/pangea_couchapp.git
    cd pangea_couchapp

Install with 
    
    couchapp push . http://localhost:5984/pangea

or (if you have security turned on)

    couchapp push . http://adminname:adminpass@localhost:5984/pangea
  
You can also create this app by running

    couchapp generate example && cd example
    couchapp push . http://localhost:5984/pangea

Deprecated: *couchapp generate proto && cd proto*


## Todo

* factor CouchApp Commonjs to jquery.couch.require.js
* use $.couch.app in app.js

## License

Apache 2.0
