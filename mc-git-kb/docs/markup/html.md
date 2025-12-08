## Relative Text Sizing as in-line CSS
Put this at the top of your page
```html
<style>
/* TEXT SIZING - Relative */
.sm-text {
    font-size: 0.875rem !important; 
}

.xs-text {
    font-size: 0.75rem !important; 
}
</style>
```

## Different img for Light or Dark Mode
You see both of these, right?
| Image | Mode|
| :--: | :--: |
| <img src="../../assets/images/github-mark-light-wbg.png" width="75" height="75"> | Light Mode (75x75) |
| <img src="../../assets/images/github-mark-dark-wbg.png" width="75" height="75"> | Dark Mode (75x75) |

#### HTML Code
I know, no CSS!<br>
**NOTE**: You can do this with two images but IF-THEN-ELSE infiltrated my brain.
```html
<picture>
    <!-- light mode -->
     <source srcset="../../assets/images/github-mark-light.png" width="75" height="75" media="(prefers-color-scheme: light)">
    <!-- dark mode -->
     <source srcset="../../assets/images/github-mark-dark.png" width="75" height="75" media="(prefers-color-scheme: dark)">
    <!-- no  preference -->
     <img src="../../assets/images/github-mark.png" width="75" height="75">
</picture>
```

#### Test it out!
You should see one or the other - switch your modes. Try it!
<div id="light-logo" style="display: none;">
  <img src="../../assets/images/github-mark-light.png" width="75" height="75" alt="Light Mode">
</div>

<div id="dark-logo" style="display: block;">
  <img src="../../assets/images/github-mark-dark.png" width="75" height="75" alt="Dark Mode">
</div>

<script>
  // Get the logo containers
  const lightLogo = document.getElementById('light-logo');
  const darkLogo = document.getElementById('dark-logo');

  // Function to switch based on scheme name
  function switchLogo(scheme) {
    if (scheme === 'slate') { // Dark Mode
      darkLogo.style.display = 'block';
      lightLogo.style.display = 'none';
    } else { // Light Mode ('default')
      darkLogo.style.display = 'none';
      lightLogo.style.display = 'block';
    }
  }

  // 1. Run immediately on load based on current scheme
  switchLogo(document.body.getAttribute('data-md-color-scheme'));

  // 2. Add listener to body attribute changes (what the theme toggle does)
  new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'data-md-color-scheme') {
        switchLogo(mutation.target.getAttribute('data-md-color-scheme'));
      }
    });
  }).observe(document.body, { attributes: true });
</script>