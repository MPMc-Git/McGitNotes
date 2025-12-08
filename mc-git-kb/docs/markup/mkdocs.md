## Mkdocs
For full documentation visit [mkdocs.org](https://www.mkdocs.org)
- `mkdocs new [dir-name]` - Create a new project.
- `mkdocs serve` - Start the live-reloading docs server.
- `mkdocs build` - Build the documentation site.
- `mkdocs -h` - Print help message and exit.

## Extensions
### [Admonition](https://squidfunk.github.io/mkdocs-material/reference/admonitions/#custom-admonitions-docsstylesheetsextracss)

!!! example inline "Inline Left"
    Should be on far left
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.

<div style="clear: both;"></div>

!!! example inline end "Inline Right" 
    Should be on far right
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor massa, nec semper lorem quam in massa.

<div style="clear: both;"></div>

!!! example "Example Title - SQL Included As Further Example"
    Example Text
    <div style="font-size: 16px;">
        ```sql
        SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE 
        FROM INFORMATION_SCHEMA.COLUMNS
        ```
    </div>
    End Example Text

---

#### Supported Admonition Types
The Material theme supports a wide range of types, each with its own icon and color<br>
Other keywords work, but check the [admonitions.md]([docs/reference/admonitions.md](https://github.com/squidfunk/mkdocs-material/blob/master/docs/reference/admonitions.md)) file for the proper names.

!!! abstract
    Example

!!! bug
    Example

!!! danger
    Example

!!! example
    Example

!!! failure
    Example

!!! info
    Example

!!! note
    Example

!!! question
    Example

!!! quote
    Example

!!! success
    Example

!!! tip
    Example

!!! warning
    Example
