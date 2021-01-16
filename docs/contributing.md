---
hide_title: true
title: Contributing
---

# Contributing

- [Contributing](#contributing)
  - [Setup](#setup)
  - [Project Structure](#project-structure)
  - [Build](#build)
  - [Documentation](#documentation)
  - [Testing](#testing)
  - [Using Git](#using-git)
  - [Development](#development)
    - [General](#general)
  - [Pull Request (PR) Process](#pull-request-pr-process)
  - [Code style](#code-style)
  - [Code of Conduct](#code-of-conduct)
    - [Our Pledge](#our-pledge)
    - [Our Standards](#our-standards)
    - [Our Responsibilities](#our-responsibilities)
    - [Scope](#scope)
    - [Enforcement](#enforcement)
    - [Attribution](#attribution)

## Setup

Fork [this repository][repo], clone your fork and add this repository as the upstream remote.

You will need to have [`pnpm`](https://pnpm.js.org) installed so make sure you follow the installation [instructions](https://pnpm.js.org/en/installation).

```bash
git clone svgmoji/svgmoji
cd template
git remote add upstream https://github.com/svgmoji/svgmoji
pnpm install

# Checkout a branch and start working on it
git checkout -b BRANCH_NAME
```

If you already have a previous version of the repository checked out then make sure to clean your `node_modules` by running the following command before installation.

```bash
pnpm clean:all
pnpm install

# An alternative which combines these two commands
pnpm refresh
```

## Project Structure

The number of files in the root directory is deliberately kept to a minimum. This is achieved by moving all configuration files to the `support/root` folder. Whenever you run `pnpm install` these files are symlinked to the root directory.

- `.github` - The `GitHub` specific configuration for workflows, issue templates and pull request templates.
- `docs` - The documentation for this project.
- `packages` - The packages provided by this project. Within this folder there are top level packages and scoped packages within the `packages/@*/*` folders.
- `support` - This is the package that provides the configuration files, the website, and many other folders. Each directory includes a readme file that explains it's functionality. Take a [look](https://github.com/svgmoji/svgmoji/tree/HEAD/support).

## Build

To build the TypeScript code (which is placed into the dist folders of the respective packages) run `pnpm build`.

To rebuild the emoji libraries you should run the following.

```bash
pnpm emoji:download # download the emoji libraries to your machine.
pnpm emoji:sprites # create the sprites in the respective emoji packages.
```

The `emoji:download` command takes approximately **2 minutes** to run on a 64GB iMac, while the `emoji:sprites` command takes **11 minutes**.

## Documentation

Documentation is located within the `docs` folder.

<br />

## Testing

Unit tests can be run with the following commands.

```bash
pnpm test # Unit Test
pnpm test:watch # Test changed files since the last commit
```

Always create your tests inside of a `__tests__/` sub-folder.

**For naming conventions, use the following.**

- Unit tests: `*.spec.ts(x)`

<br />

## Using Git

I recommend that while working on your code you commit early and often. You won't be judged. All worked submitted in a pull request (see following section) will be squashed into one commit before merging (unless it makes sense to keep the commits as separate items).

This project has support for git hooks via [husky]. These hooks help keep the code base quality high by running checks:

- Before each commit (lint and test changed files).
- Before each push (lint, typecheck and test).

By default these checks are **not** run automatically. To enable automatic pre-commit and pre-push hooks use the following command:

```bash
pnpm checks:enable
```

To stop pre-commit / pre-push checks run:

```bash
pnpm checks:disable
```

<br />

## Development

If you're modifying a package and import helpers from another packages in the monorepo, ensure that the other package is referenced in the referring package's `package.json` file.

### General

This project uses [`preconstruct`](https://github.com/preconstruct/preconstruct) to manage builds. Each time the project is installed `preconstruct dev` is run which automatically sets the dist folder with entry points mapping to the source files of the package. This is really useful for development and except for one exception when working on the playground is all you need.

<br />

## Pull Request (PR) Process

Once your work is complete you'll want to create a Pull Request to share all that goodness with the rest of us.

1. Create a [pull request](https://help.github.com/en/articles/creating-a-pull-request) using the github interface. The template will automatically populate for you.
2. Add a description and reference the issue this pull request addresses where applicable. The description will be used as the body of the git commit message since all pull request are squashed down into one commit before merging.
3. Tick off all relevant check boxes by placing an x between the square brackets i.e. `[ ]` to `[x]`.
4. Please add a screenshot where the change is related to the user interface or design. It makes it so much easier to grasp the intentions of your work. You can use your favourite GIF screenshare tool for creating animated screenshots.
5. Once submitted the PR will be addressed at our earliest convenience.

<br />

## Code style

Over time this project has accumulated quite an active set of lint rules.

The following are some personal preferences for coding style.

- Functions with more than two arguments should condense these arguments into a parameter object.
- Comment everything. Even if the comment is just to say, `I have no idea what I'm doing`, there is a lot of information in that comment.
- Choose simplicity over performance. Performance is abstract and it's often better to start with a simple implementation that can be made more performant, than something that's complex from day one.
- Use `const` **Arrow Functions** when declaring components.

```tsx
const MyComponent = () => {
  return <div />;
};
```

- Use **Function Declarations** when creating top level functions.

```ts
// ✅ - GOOD
function doSomething(something: string) {
  return `Cannot do ${something}`;
}

// ❌ - BAD
const doSomething = (something: string) => {
  return `Cannot do ${something}`;
};
```

<br />

## Code of Conduct

<br />

### Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at help@kickjump.co. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant], version 1.4, available at [http://contributor-covenant.org/version/1/4][version]

[contributor covenant]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
[repo]: https://github.com/svgmoji/svgmoji
[husky]: https://github.com/typicode/husky
