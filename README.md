# node-threading-event

A simple and lightweight implementation of `threading.Event` in Node.js

## Installation

**Node.js 15.0.0 or newer is required.**

```sh
npm install node-threading-event
```

## Example usage

```js
const NodeThreadingEvent = require('node-threading-event');

const event = new NodeThreadingEvent();

event.set();

if (event.isSet()) {
  console.log('Event is set !');
}

event.clear();

(async function() {
  setTimeout(() => {
    event.set();
  }, 1000);

  const res = await event.wait();
  console.log('Event is set after 1 second');
})()

(async function() {
  setTimeout(() => {
    event.set();
  }, 500);

  const res = await event.wait(1000);
  console.log('Event is set after 1 second');
})()
```

## Documentation

### set()

Set the internal flag to true.
- Return `void`

### isSet()

Return true if and only if the internal flag is true.
- Return `boolean`

### clear()

Reset the internal flag to false.
- Return `void`

### wait(timeout = null)

Block until the internal flag is true.
 
If the internal flag is true on entry, return immediately. Otherwise,
block until another set() call to set the flag to true, or until
the optional timeout occurs.

- `timeout` - (optional) - Specify the time to wait until the timeout occurs.
- Return `Promise<boolean>`


