## Different img for Light or Dark Mode

###### You see both of these, right?
| Image | Mode|
| :--: | :--: |
| <img src="../../assets/images/github-mark-light-wbg.png" width="75" height="75"> | Light Mode (75x75) |
| <img src="../../assets/images/github-mark-dark-wbg.png" width="75" height="75"> | Dark Mode (75x75) |

##### Html Code - I know, no CSS! NOTE: You can do this with two images but IF-THEN-ELSE infiltrated my brain.
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


##### You should see one or the other - switch your modes. Try it!
<div class="img-light">
    <picture>
        <source srcset="../../assets/images/github-mark-light.png" width="75" height="75"  media="prefers-color-scheme: light)">
        <img src="../../assets/images/github-mark-light.png" width="75" height="75" alt="Light Mode">
    </picture>
</div>

<div class="img-dark">
    <picture>
        <source srcset="../../assets/images/github-mark-dark.png" width="75" height="75" media="prefers-color-scheme: dark)">
        <img src="../../assets/images/github-mark-dark.png" width="75" height="75" alt="Dark Mode">
    </picture>
</div>
