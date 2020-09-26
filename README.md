# Noumenal Sky

Noumenal Sky is a user friendly website for learning different facts about objects in our solar system. You can learn some trivia and an objects physicial or orbital characteristics.
With each data point also comes a glossary to explain the meaning of the lexicon that astrophysicists use, such as periapsis, or AU. ALl the data is referenced for the user so that they may consult
the sources from where we got our data on each object.

## Features

### Home

The home page consists of interactive lists. The main div id's are:

- category-list
  - This will display a list of categories a user can select. These currently are "Planets," "Dwarf Planets," "Moons," and "Other." Clicking one of these will bring up a unique list in "object-list" that a user can click.
    Planets will display 8 listitems. Dwarf Planets will display 5 listitems. Moons will display 23 listitems. Other will display 6 listitems. Moons is not exhaustive as there are so far 219 moons discovered. Other contains
    miscellaneous objects such as a comet, asteroid, minor planets, etc.
    After selecting a category, "category-list" will hide and "object-list" will display.
- object-list
  - This will display a list of objects that a user can select. On clicking on one of these, a photo of the object will be displayed to the left of the list or above it depending on what screen size a user is viewing the website on.
  A new list will also be displayed in "info-selection." A button will appear at the top of the list to allow a user to return to the "category-list."
- info-selection
    - Displayed here will be a list of mostly 3 listitems; some objects will display only 2 listitems. These items will be "about," "physicial characteristics," and "orbital characteristics." "about" will display trivia on the object
    in "display-info," and the other two lists will display tables will data in "display-info." "info-selection" will hide and "display-info" will display.
- display-info
    - If a table is displayed, a user may click a table row to bring up information in "row-info." This will hide "display-info," and display "row-info." A return button will be displayed at the top left of "display-info" so a user can
    return to "info-selection."
- row-info
    -this will display the table row the user clicked on. Below that will be a heading of the property name with a brief explanation of that property. Beneath that will be a heading of the unit with an explanation of that unit.
    Beneath this will be a final heading titled "Data Reference," which will give the user a link to the source of the value in the row with an author name and title. Beneath this will be a link to references.html for a full list 
    of references from where data was gathered for this website. A return button will appear at the top left of "row-info" that will allow a user to return to "display-info."

An icon on the bottom right of the image that appears when a user clicks on a listitem in "object-list" will bring up a modal with a larger image and some information on the image. This modal may be closed by clicking an icon on the top
right of the modal, or by clicking outside the modal.


### Future Features

I intend on expanding on this websites content. Since the list of moons is very large, I may create some extra lists to split them up and appropriately name them so that the moon lists are not too large. I would like also to remove some
items from "other" and add them to new categories, such as asteroids, comets, minor planets, and so on.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- [JQuery](https://jquery.com/)

## Validation

All CSS passed validation on the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)
All HTML passed validation on the [W3C Markup Validation Service](https://validator.w3.org/)

## Credits

All data on this website is sourced from these sources.
[Data Reference List](assets/credits/references.txt)
Images and their descriptions:
[Object Images](assets/credits/space-images.txt)

The following icons were sourced from [Font Awesome](https://fontawesome.com/)

- [fa-facebook-square](https://fontawesome.com/icons/facebook-square?style=brands)
- [fa-instagram](https://fontawesome.com/icons/instagram?style=brands)
- [fa-twitter-square](https://fontawesome.com/icons/twitter-square?style=brands)
- [fa-times-circle](https://fontawesome.com/icons/times-circle?style=regular)
- [fa-expand-arrows-alt]https://fontawesome.com/icons/expand-arrows-alt?style=solid()
- [fa-chevron-left](https://fontawesome.com/icons/chevron-left?style=solid)
- [fa-external-link-alt](https://fontawesome.com/icons/external-link-alt?style=solid)

### Media

font styles used:

- [Ubuntu Mono](https://fonts.google.com/specimen/Ubuntu+Mono?query=ubuntu+mono)
- [Mulish](https://fonts.google.com/specimen/Mulish?query=mulish)

### Acknowledgements

- Thanks to the [Code Institute](https://codeinstitute.net/5-day-coding-challenge/?utm_term=code%20institute&utm_campaign=a%2526c_BR_IRL_Code_Institute&utm_source=adwords&utm_medium=ppc&hsa_net=adwords&hsa_tgt=kwd-319867646331&hsa_ad=417883010337&hsa_acc=8983321581&hsa_grp=62188641240&hsa_mt=e&hsa_cam=1578649861&hsa_kw=code%20institute&hsa_ver=3&hsa_src=g&gclid=CjwKCAjwwab7BRBAEiwAapqpTEswcNcDEOmOyi4fCT-PcSheBvn53AA4ovSOWQuIihlEAascEMo_nRoC5s4QAvD_BwE&gclsrc=aw.ds) for my coding lessons.
- I learned some extra JavaScript techniques using "JavaScipt & JQuery: Interactive front-end web development" by Jon Duckett.
- Thanks to my friends and family who tested the website during its development and helped me with their valuable feedback on the user design.

