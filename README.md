# JSONwriter
A lightweight javascript solution to allow on-page edits of text to be exported into a JSON configuration file

## * Do not use this in it's current state

This is a rough first draft, and only to be used as a developer tool.

## Installation & Usage

Include the script on your site footer and create a new writer instance

```
var JSONwriter = new writerInit('data-text-edit');
```

This will provide on page edits of text elements with an attribute of the provided type ( i.e 'data-text-edit' ).

```
<p data-text-edit='configIdentifier'></p>
```

The value for the attribute will provide the key in the JSON, and the innerHTML the value.

From there, you should see a very light interface with save, reload, and a dropdown for languages. Saving will do approximately what it promises, and reloading will refresh the writer instance if you happen to be using dynamic content loaded after JSONwriter is created.

## Disclaimer

At the moment I'm sure there are many edge cases surrounding part of this such as requiring a more nested JSON structure, facility for extra languages, and also a variety of limitations on html5's contenteditable functionality.