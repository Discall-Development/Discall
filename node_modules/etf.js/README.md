# etf.js

<!-- markdownlint-disable MD033 -->
<div align="center">
  <p>
    <a href="https://www.npmjs.com/package/etf.js">
      <img src="https://img.shields.io/npm/v/etf.js.svg?maxAge=3600" alt="NPM version" />
    </a>
    <a href="https://www.npmjs.com/package/etf.js">
      <img src="https://img.shields.io/npm/dt/etf.js.svg?maxAge=3600" alt="NPM downloads" />
    </a>
    <a href="https://dev.azure.com/vladfrangu/Public/_build/latest?definitionId=7&branchName=master">
      <img src="https://dev.azure.com/vladfrangu/Public/_apis/build/status/vladfrangu.etf.js?branchName=master" alt="Build status" />
    </a>
    <a href="https://dev.azure.com/vladfrangu/Public/_build/latest?definitionId=7&branchName=master">
      <img src="https://img.shields.io/azure-devops/coverage/vladfrangu/Public/7/master.svg" alt="Azure DevOps coverage">
    </a>
    <a href="https://lgtm.com/projects/g/vladfrangu/etf.js/alerts/">
      <img src="https://img.shields.io/lgtm/alerts/g/vladfrangu/etf.js.svg?logo=lgtm&logoWidth=18" alt="Total alerts">
    </a>
    <a href="https://dependabot.com">
      <img src="https://api.dependabot.com/badges/status?host=github&repo=vladfrangu/etf.js" alt="Dependabot Status">
    </a>
    <a href="https://www.patreon.com/kingdgrizzle">
      <img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" />
    </a>
  </p>
  <p>
    <a href="https://nodei.co/npm/etf.js/"><img src="https://nodei.co/npm/etf.js.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
</div>
<!-- markdownlint-enable MD033 -->

## About

[`External Text Format`][etf] is the format Erlang uses when sending and receiving data. This module implements packing and unpacking of said format in pure, native JavaScript.

## Usage

This module is [plug-and-play](https://en.wikipedia.org/wiki/Plug_and_play), it exposes two functions, `pack` and `unpack`, and would be used in the following way:

```javascript
const { pack, unpack } = require('etf.js');
const serialized = pack({ hello: 'world' });
const deserialized = unpack(serialized);
console.log(deserialized); // { hello: 'world' }
```

### What can be packed

- [x] Null ([Primitive Tests](https://github.com/vladfrangu/etf.js/blob/master/src/test/primitives.ts))
- [x] Booleans ([Primitive Tests](https://github.com/vladfrangu/etf.js/blob/master/src/test/primitives.ts))
- [x] Strings ([Primitive Tests](https://github.com/vladfrangu/etf.js/blob/master/src/test/primitives.ts))
- [x] Atoms ([Atom Tests](https://github.com/vladfrangu/etf.js/blob/master/src/test/atoms.ts))
- [x] Unicode Strings ([String Tests](https://github.com/vladfrangu/etf.js/blob/master/src/test/strings.ts))
- [x] Floats ([Primitive Tests](https://github.com/vladfrangu/etf.js/blob/master/src/test/primitives.ts))
- [x] Integers ([Primitive Tests](https://github.com/vladfrangu/etf.js/blob/master/src/test/primitives.ts))
- [x] Longs ([Primitive Tests](https://github.com/vladfrangu/etf.js/blob/master/src/test/primitives.ts))
- [x] Longs over 64 bits ([Primitive Tests](https://github.com/vladfrangu/etf.js/blob/master/src/test/primitives.ts))
- [x] Objects
- [x] Arrays
- [ ] Tuples
- [ ] PIDs
- [ ] Ports
- [ ] Exports
- [ ] References

Plus added support for Maps (will be converted into Objects) and Sets (will be converted into Arrays)

## Credits

`etf.js` is heavily based of [`binarytf`][binarytf] for the structure, and could not have been done without the help from it's author:

- [Antonio Román](https://github.com/kyranet)

## Contributing

1. Fork it!
1. Create your feature branch: `git checkout -b my-new-feature`
1. Commit your changes: `git commit -am 'Add some feature'`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a pull request!

## Author

**etf.js** © [vladfrangu][githubvlad], released under the
[MIT](https://github.com/vladfrangu/etf.js/blob/master/LICENSE) License.
Authored and maintained by vladfrangu.
> Github [vladfrangu][githubvlad] - Twitter [@KingDGrizzle](https://twitter.com/KingDGrizzle)

[etf]: http://erlang.org/doc/apps/erts/erl_ext_dist.html
[binarytf]: https://github.com/binarytf/binarytf
[githubvlad]: https://github.com/vladfrangu
