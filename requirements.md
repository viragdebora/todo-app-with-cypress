This file contains the requirements for the given features:

Login page:
- Login page should be loaded when you open the application
- If the user is unauthenticated and trying to open any other page (e.g.: /todo), the login page should be loaded
- In case of a improper credentail, error message should be visible
- After the user tried to open any page (e.g. /todo) then the user logged in, the page that should be loaded

Home page:
- After the user logged in the home page should be visible
- On the home page, welcome text should be visible
- The navbar should be visible

Todos page:
- Opening the Todos page the Sidepanel should be visible, an a text to "Nothing to show"
Sidepanel:
- The user should be able to see the existing todo lists, otherwise there should be a button to add new todo list
- If there is at least one todo list, any of the lists should not be visible by default, and the items also should not have active state in that case
- If one of the list is visible, the list item should have an active, to indicate which todo list is visible
- The opened todo list should relfect in the URL with an id parameter
- The todo lists are in chronological order
- Duplicates are allowed
- Clicking on the Add list button, the Dialog Box should be visible

Todo list:
- After the user created a todo list, and clicked on it, the Todo List view should be visible
- In case there is no todo item, the  user able to add new todo by the Todo title input field
- The Todo Title input field should be only add characters - letters, numbers, special characters - but not whitespaces
- If there is at least one todo item, the user able to change the state of the item - in progress or completed - even delete the item
- The user also able to delete the whole todo list if needed, by clicking on the three dot then on the Delete list button
- The todo items are in reversed chronological order
- Duplicates are allowed

404 error page:
- In case the user opens an unexisting page, the 404 page should be loaded
- There should be a button to redirect to the home page

Components:<br>
Navbar:
- On the navbar, the two main page should be visible (Home, Todos), and a user panel
- Clicking on the Home or Todos button should redirect to the corresponding page
- Clicking on the user panel, the logout option should be visible

Dialog Box:
- The user should be able to add new todo list in the Sidepanel
- If the user clicks on the add list button the Dialog Box should be visible
- In the Dialog Box the user should be only add characters - letters, numbers, special characters - but not whitespaces
- There should be visible input field, cancel and create button
