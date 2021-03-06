# Introduction

Easy clipboard is a lightweight chrome extension built in React/Redux and TypeScript for keeping track of things that you copy and paste on the web. It also comes with a couple of customizable features through the options page.

Free to download here: https://chrome.google.com/webstore/detail/easy-clipboard/lkpiolleljimgohflbgekkbeoiajighj

Feel free to submit a pull request if you have features that you want to add to this extension!

# Building & Testing

1. `yarn run build` to generate a fast development build for debugging in the `dist` folder
2. Navigate to `chrome://extensions/` URL in Chrome
3. Turn on `developer mode` in the top right hand corner
4. Click on `Load unpacked`
5. Select the entire `dist` folder

# Backlog

1. Test cases
2. Fix various minor search bugs that result from weird regex searches
3. Investigate issues with auto-copying text within iframes
4. Remove bootstrap to save even more space
