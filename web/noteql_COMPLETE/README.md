
GraphQL Introspection

https://gist.github.com/craigbeck/b90915d49fda19d5b2b17ead14dcd6da


Remove the lines that errored (16-18)

Be sure to send this on a new request


```
query IntrospectionQuery {    __schema {      queryType { name }      mutationType { name }      subscriptionType { name }      types {        ...FullType      }      directives {        name        description        args {          ...InputValue        }      }    }  }  fragment FullType on __Type {    kind    name    description    fields(includeDeprecated: true) {      name      description      args {        ...InputValue      }      type {        ...TypeRef      }      isDeprecated      deprecationReason    }    inputFields {      ...InputValue    }    interfaces {      ...TypeRef    }    enumValues(includeDeprecated: true) {      name      description      isDeprecated      deprecationReason    }    possibleTypes {      ...TypeRef    }  }  fragment InputValue on __InputValue {    name    description    type { ...TypeRef }    defaultValue  }  fragment TypeRef on __Type {    kind    name    ofType {      kind      name      ofType {        kind        name        ofType {          kind          name        }      }    }  }
```

You can see AllNotes and then play with it more