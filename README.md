# Teamtreehouse Webdevelopement Techdegree - Unit 7
## Interactive Registration Form
*By DoKe65 (Doris Keller)*  

In this 7th project of Teamtreehouses Web Development Techdegree we're asked to write the javascript code to make a provided html form interactive.

We don't have permission to modify the html, but the css.

### Provided Files
- index.html
- style.css
- some image files (svg and png)

### Skills used
- javascript

## Conditional Error Messages

1. **Name Field**
The name field must at least contain 2 characters. The test is executed on blur and when the form is submitted. Two different messages are displayed when there's only one character or when the field is empty

2. **Email Field**
The email address must not be empty and must contain an @-sign and a valid domain. Different messages are displayed when the user leaves the field (on blur).

3. **Activities**
The activities are tested as soon as the user choses an activity.

4. **Credit Card** (all 3 "number" fields)

  4.1 Real time test on keyup: When the user types in a non-digit character, a corresponding hint is displayed and the field's parent is set to "invalid". When the wrong character is deleted, the hint disappears and the field is just on focus. As soon as the allowed length is reached, the field turns to valid. If it's too long, the hint's text changes and the field's parent is set to invalid again.

  4.2 Test on blur and test on submission of the form tests the length and validity, but displays the original message when the fields aren't valid.


**Be happy and code on!**
