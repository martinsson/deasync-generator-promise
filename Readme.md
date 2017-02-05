# Make generators and promises synchronous

Don't contaminate the caller with asynchronism. 

Avoid verbose promise syntax using generators.

```javascript
    let [aExists, bExists] = dasyncGenerator(function*() {
            yield copyAsync(src, dest)
            yield renameFileAsync(oldName, newName)
            return yield [fsExistAsync(fileA), fsExistAsync(fileB)]
        })
```

Uses the excellent library co, and deasync

Also works for promises

    let helloWorld = dasyncPromise(() => Promise.resolve('hello world'))