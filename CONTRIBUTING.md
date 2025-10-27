# Contributing Guide

Thank you for your interest in **Discord Profile Card**!
This document explains how to set up the project, contribute effectively, and follow repository conventions.

## Prerequisites

-   Node.js **18+**
-   A Discord bot with a valid **BOT_TOKEN**
-   A package manager of your choice: **PNPM** (recommended), **NPM**, or **Yarn**

---

## Project Setup

1. Fork the repository and clone your copy:

```bash
git clone https://github.com/<your-username>/discord-profile-card.git

cd discord-profile-card
```

2. Install dependencies:

```bash
# using pnpm (recommended)
pnpm install

# or npm
npm install

# or yarn
yarn install

```

3. Create a `.env` file in the project root:

```properties
BOT_TOKEN=your_discord_bot_token
```

---

## Git Rules

### Conventional Branch Naming

Branches must follow this format:

```
<type>/<scope>[-short-description]
```

**Examples:**

-   `feat/card-layout`

-   `fix/api-error`

-   `refactor/image-rendering`

-   `chore/update-deps`

**Valid types:**
`feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`, `perf`

### Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

**Format:**

```
<type>(<scope>): <message>
```

**Examples:**

-   `feat(card): add user status display`

-   `fix(api): handle missing user data`

-   `docs(contributing): add commit and branch naming rules`

-   `refactor(renderer): improve image generation performance`

**Rules:**

-   Write commit messages in English.

-   Start the message in lowercase, no period at the end.

---

## Contribution Process

1. Create a new branch from `dev` following the naming convention.

```bash
git checkout dev
git pull origin dev
git checkout -b <type>/<scope>
```

2. **Before committing**, make sure your code is clean and passes all checks:

```bash
pnpm run lint && pnpm run build
# or
npm run lint && npm run build
# or
yarn lint && yarn build

```

> Only commit once the linter shows no errors or warnings.

3. Commit using the **Conventional Commit** format.

4. Push your branch and open a **Pull Request (PR)** targeting `dev`, not `main`.

-   Use a clear and descriptive title
-   Link any related issues (if exists)
-   Provide context or screenshots if relevant

---

## Reporting Issues or Feature Requests

Open a **GitHub issue** with:

-   A clear and descriptive title
-   Steps to reproduce (if applicable)
-   Logs or screenshots (optional but helpful)

---

## Code of Conduct

Be respectful, concise, and constructive in all discussions.

We collaborate to build something great together.
