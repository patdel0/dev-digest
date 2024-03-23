### Coding Guidelines and Best Practises

**How do we want to write/structure our commits?**
Commit Structure:
Atomic Commits: Each commit should represent a single logical change. This enhances readability and makes it easier to track changes.
Clear and Descriptive Messages: Commit messages should be concise yet descriptive, summarizing the changes made. Following a consistent format like "Verb + Subject" (e.g., "Fix: Button alignment issue") can be beneficial.
Reference Issue IDs: If applicable, reference relevant issue or ticket IDs in the commit messages for better traceability.
Refinement Suggestions:
Incorporate a convention for categorizing commits (e.g., "Feature:", "Fix:", "Refactor:") for better organization.
Utilize tools like commit message templates or linters to enforce consistent commit message formatting.

```sh
Commit Message Example:
Fix: Resolve issue with login button not displaying correctly
Feature: Implement user authentication

- Refactor login button component
- Add error handling for login failures
- Closes #123
```

**Merge is the way to go!**

Advantages:
Preserves the history of changes: When you merge a branch into another, the merge commit retains the history of both branches, showing the point at which they were merged.
Simplicity: Merging is generally easier and more straightforward, especially for teams who are less familiar with Git or who have less complex branching structures.
Less risk of conflicts: Merging tends to result in fewer conflicts compared to rebasing, particularly in situations where multiple developers are working on the same branch concurrently.

**How do we want to name our branches?**

Branching Strategy:
Meaningful Branch Names: Branch names should reflect the purpose or feature being worked on. Avoid generic names like "fix" or "update".
Feature Branches: Encourage the use of feature branches for development to isolate changes and facilitate easier collaboration.
Regular Cleanup: Delete merged branches to keep the repository clean and manageable.

Refinement Suggestions:

Adopt a branching model like Gitflow or GitHub Flow based on the project's needs.
Automate branch creation and deletion with scripts or Git hooks for consistency and efficiency.

Branch Name Example:

```sh
feature/user-authentication
```

**How do we ensure that we are using the same syntax?**

Syntax Consistency:

Coding Style Guide: Define a coding style guide covering aspects like indentation (spaces vs. tabs), quote usage (single vs. double), line length, etc.
Editor Configurations: Utilize editor configurations or IDE plugins to enforce coding style rules consistently across the team.
Linting and Formatting: Integrate linters and code formatters like ESLint and Prettier into the project workflow to automatically enforce coding standards.

Refinement Suggestions:

Create or adopt a shared ESLint configuration tailored for React projects to ensure consistent code quality.
Include pre-commit hooks to run automated checks for syntax consistency before allowing commits.

Coding Style Guide:
Use double quotes for string literals.
Indent using 2 spaces.

Refinement: Editor Configurations and Linting:
EditorConfig file (.editorconfig):

```sh
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
end_of_line = lf
insert_final_newline = true

[*.js]
quote_type = double
```

Integrating ESLint and Prettier with npm scripts:

json

```sh
"scripts": {
"lint": "eslint .",
"format": "prettier --write ."
}
```
