## Different img for Light or Dark Mode

###### You see both of these, right?
| Image | Mode|
| :--: | :--: |
| <img src="../../images/github-mark-dark-wbg.png" width="75" height="75"> | Dark Mode (75x75) |
| <img src="../../images/github-mark-light-wbg.png" width="75" height="75"> | Light Mode (75x75) |

##### Html Code - I know, no CSS! NOTE: You can do this with two images but IF-THEN-ELSE infiltrated my brain.
```html
<picture>
    <!-- light mode -->
     <source srcset="../../images/github-mark-light.png" width="75" height="75" media="(prefers-color-scheme: light)">
    <!-- dark mode -->
     <source srcset="../../images/github-mark-dark.png" width="75" height="75" media="(prefers-color-scheme: dark)">
    <!-- no  preference: -->
     <img src="../../images/github-mark.png" width="75" height="75">
</picture>
```


##### You should see one or the other - switch your modes. Try it!
<picture>
    <!-- light mode -->
     <source srcset="../../images/github-mark-light.png" width="75" height="75" media="(prefers-color-scheme: light)">
    <!-- dark mode -->
     <source srcset="../../images/github-mark-dark.png" width="75" height="75" media="(prefers-color-scheme: dark)">
</picture>



<div class="img-light">
  <img src="../../images/github-mark-light.png" width="75" height="75" alt="Light Mode">
</div>

<div class="img-dark">
  <img src="../../images/github-mark-dark.png" width="75" height="75" alt="Dark Mode">
</div>
