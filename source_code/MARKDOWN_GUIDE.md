# Markdown Formatting Guide for Your Blog

This guide shows all the markdown syntax you can use in your blog posts.

---

## Text Formatting

### Bold Text
```markdown
**This is bold text**
__This is also bold__
```
Result: **This is bold text**

### Italic Text
```markdown
*This is italic*
_This is also italic_
```
Result: *This is italic*

### Bold + Italic
```markdown
***This is bold and italic***
___This is also bold and italic___
```
Result: ***This is bold and italic***

### Strikethrough
```markdown
~~This text is crossed out~~
```
Result: ~~This text is crossed out~~

---

## Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

---

## Lists

### Unordered Lists
```markdown
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3
```

Result:
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered Lists
```markdown
1. First item
2. Second item
3. Third item
   1. Nested item 3.1
   2. Nested item 3.2
```

Result:
1. First item
2. Second item
3. Third item
   1. Nested item 3.1
   2. Nested item 3.2

---

## Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover to see title")
```

Result: [Link text](https://example.com)

---

## Images

### Basic Image
```markdown
![Image description](https://via.placeholder.com/600x300)
```

### Image with Title
```markdown
![Alt text](https://via.placeholder.com/600x300 "Image title")
```

**Pro tip:** You can use free image hosting services like:
- [Imgur](https://imgur.com)
- [Unsplash](https://unsplash.com) (free stock photos)
- [Cloudinary](https://cloudinary.com)

---

## Code

### Inline Code
```markdown
Use `console.log()` to print to the console.
```
Result: Use `console.log()` to print to the console.

### Code Blocks (with syntax highlighting)

#### JavaScript
````markdown
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("Daniel");
```
````

Result:
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("Daniel");
```

#### Python
````markdown
```python
def greet(name):
    print(f"Hello, {name}!")

greet("Daniel")
```
````

Result:
```python
def greet(name):
    print(f"Hello, {name}!")

greet("Daniel")
```

#### TypeScript
````markdown
```typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Daniel",
  age: 25
};
```
````

#### HTML
````markdown
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```
````

#### CSS
````markdown
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}
```
````

**Supported languages:** javascript, typescript, python, java, go, rust, html, css, json, sql, bash, and many more!

---

## Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> And have multiple paragraphs.
```

Result:
> This is a blockquote.
> It can span multiple lines.

### Nested Blockquotes
```markdown
> This is a quote
>> This is nested
>>> This is double nested
```

---

## Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
| Row 3    | Data     | Data     |
```

Result:
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
| Row 3    | Data     | Data     |

### Aligned Tables
```markdown
| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Text         | Text           | Text          |
```

---

## Horizontal Lines

```markdown
---
or
***
or
___
```

Result:
---

---

## Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
  - [x] Nested completed
  - [ ] Nested incomplete
```

Result:
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
  - [x] Nested completed
  - [ ] Nested incomplete

---

## Citations and Footnotes

You can add inline citations using footnotes for academic or reference-heavy posts.

### Basic Footnotes
```markdown
This is a statement that needs a citation[^1]. Here's another claim[^2].

You can also use named references[^study-2024].

[^1]: Author Name. "Article Title." *Journal Name*, 2024. https://example.com
[^2]: Another Author. "Book Title." Publisher, 2023.
[^study-2024]: Smith, J. et al. "Research Title." *Nature*, 2024. DOI: 10.1038/example
```

Result:
This is a statement that needs a citation[^1]. Here's another claim[^2].

[^1]: Author Name. "Article Title." *Journal Name*, 2024. https://example.com
[^2]: Another Author. "Book Title." Publisher, 2023.

### Multiple Citations
```markdown
Recent research confirms this finding[^1][^2][^3].

[^1]: First source
[^2]: Second source
[^3]: Third source
```

### Alternative: Numbered Brackets
If you prefer `[1]` style citations:
```markdown
This claim needs a source [[1]](#ref1). Another statement [[2]](#ref2).

## References

<a id="ref1">[1]</a> Smith, J. "Title." *Journal*, 2024.

<a id="ref2">[2]</a> Jones, A. "Another Title." *Conference*, 2023.
```

---

## Example Blog Post

Here's a complete example combining everything:

````markdown
---
title: My First Tech Post
excerpt: Learning how to use React hooks effectively
date: 2026-01-10
category: tech
readTime: 5 min
imageUrl: https://via.placeholder.com/1200x600
slug: my-first-tech-post
---

# Introduction

Welcome to my **first tech blog post**! Today I'll talk about *React hooks*.

## What are Hooks?

Hooks are functions that let you "hook into" React features. Here are the most common ones:

- `useState` - For managing state
- `useEffect` - For side effects
- `useContext` - For context values

### Example: useState

Here's how to use `useState`:

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Example: useEffect

And here's `useEffect`:

```javascript
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

## Key Takeaways

> **Important:** Always call hooks at the top level of your component.
> Don't call them inside loops or conditions!

Here's a comparison:

| Hook | Purpose | Returns |
|------|---------|---------|
| useState | State management | [state, setState] |
| useEffect | Side effects | cleanup function |
| useContext | Context access | context value |

## Research & Evidence

According to the official React documentation, hooks were introduced to solve common problems in React development[^react1]. Studies show that hooks improve code reusability and reduce component complexity[^hooks-study].

## Resources

Check out these links:
- [React Docs](https://react.dev)
- [React Hooks Guide](https://react.dev/reference/react)

![React Logo](https://via.placeholder.com/400x200)

## Conclusion

That's it! Happy coding! ✨

## References

[^react1]: React Team. "Introducing Hooks." *React Blog*, 2019. https://react.dev/blog/2019/02/06/react-v16-8-0
[^hooks-study]: Johnson, M. "React Hooks: A Comprehensive Analysis." *Journal of Web Development*, 2023.

---

**Next up:** We'll explore custom hooks in the next post.
````

---

## Side-by-Side Images

You can display multiple images side-by-side using HTML with Tailwind classes.

### Two Images Side-by-Side

```markdown
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <img src="https://via.placeholder.com/400x300" alt="Image 1" class="w-full rounded-lg" />
  <img src="https://via.placeholder.com/400x300" alt="Image 2" class="w-full rounded-lg" />
</div>
```

Result:
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <img src="https://via.placeholder.com/400x300" alt="Image 1" class="w-full rounded-lg" />
  <img src="https://via.placeholder.com/400x300" alt="Image 2" class="w-full rounded-lg" />
</div>

**Note:** This layout stacks vertically on mobile and displays side-by-side on tablets and desktops.

### Three Images in a Row

```markdown
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
  <img src="https://via.placeholder.com/300x300" alt="Image 1" class="w-full rounded-lg" />
  <img src="https://via.placeholder.com/300x300" alt="Image 2" class="w-full rounded-lg" />
  <img src="https://via.placeholder.com/300x300" alt="Image 3" class="w-full rounded-lg" />
</div>
```

### With Captions

```markdown
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div>
    <img src="https://via.placeholder.com/400x300" alt="Image 1" class="w-full rounded-lg" />
    <p class="text-center text-sm text-stone-600 mt-2">Caption for first image</p>
  </div>
  <div>
    <img src="https://via.placeholder.com/400x300" alt="Image 2" class="w-full rounded-lg" />
    <p class="text-center text-sm text-stone-600 mt-2">Caption for second image</p>
  </div>
</div>
```

### Before/After Comparison

Perfect for showing comparisons:

```markdown
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div>
    <h4 class="text-center font-semibold mb-2">Before</h4>
    <img src="https://via.placeholder.com/400x300" alt="Before" class="w-full rounded-lg border-2 border-red-200" />
  </div>
  <div>
    <h4 class="text-center font-semibold mb-2">After</h4>
    <img src="https://via.placeholder.com/400x300" alt="After" class="w-full rounded-lg border-2 border-green-200" />
  </div>
</div>
```

### Adjusting Gap Size

You can change the spacing between images:

- `gap-2` - Small gap
- `gap-4` - Medium gap (default)
- `gap-6` - Large gap
- `gap-8` - Extra large gap

```markdown
<div class="grid grid-cols-2 gap-8 my-6">
  <img src="https://via.placeholder.com/400x300" alt="Image 1" class="w-full rounded-lg" />
  <img src="https://via.placeholder.com/400x300" alt="Image 2" class="w-full rounded-lg" />
</div>
```

---

## Tips for Writing Great Blog Posts

1. **Use headings** to structure your content (H2 for sections, H3 for subsections)
2. **Include code examples** with proper syntax highlighting
3. **Add images** to break up text and illustrate points
4. **Use lists** for easy scanning
5. **Quote important points** with blockquotes
6. **Link to resources** for further reading
7. **Add citations** with footnotes for research-backed claims
8. **Keep paragraphs short** for better readability

---

## Quick Reference

| Want to... | Use this |
|------------|----------|
| Bold | `**text**` |
| Italic | `*text*` |
| Code | `` `code` `` |
| Link | `[text](url)` |
| Image | `![alt](url)` |
| Heading | `## Heading` |
| List | `- item` or `1. item` |
| Quote | `> quote` |
| Footnote | `text[^1]` + `[^1]: source` |
| Code block | ` ```language` <br> `code` <br> ` ``` ` |

---

Happy blogging! 🎉
