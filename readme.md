<p align="center">
  <a href="#">
    <img width="300" height="300" src="support/assets/logo.svg" alt="svg logo from undraw.co" title="SVG Logo from undraw.co" />
  </a>
</p>

<p align="center">
  Popular open-source emoji libraries available in SVG format.
</p>

<br />

<p align="center">
  <a href="#why"><strong>Why?</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#future"><strong>Future</strong></a> ·
  <a href="docs"><strong>Docs</strong></a> ·
  <a href="docs/contributing.md"><strong>Contributing</strong></a>
</p>

<br />

<p align="center">
  <a href="https://github.com/svgmoji/svgmoji/actions?query=workflow:ci">
    <img src="https://github.com/svgmoji/svgmoji/workflows/ci/badge.svg?branch=main" alt="Continuous integration badge for github actions" title="CI Badge" />
  </a>
</p>

<br />

## Why

Consume emoji libraries as SVG sprites.

<br />

## Getting Started

Install the emoji library of your choice `svgmoji`.

```bash
pnpm add @svgmoji/noto
```

<br />

## Future

- [ ] Optimize the individual SVG's with `svgo`.

## Contributing

Please read our [contribution guide] for details on our code of conduct, and the process for submitting pull requests. It also outlines the project structure so you can find help when navigating your way around the codebase.

In addition each folder in this codebase a readme describing why it exists.

You might also notice there are surprisingly few files in the root directory of this project. All the configuration files have been moved to the `support/root` directory and are symlinked to the root directory in a `preinstall` hook. For more information take a look at [folder](support/root) and [readme](support/root/readme.md).

<br />

## Versioning

This project uses [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/svgmoji/svgmoji/tags).

<br />

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

[contribution guide]: docs/contributing
[typescript]: https://github.com/microsoft/Typescript
