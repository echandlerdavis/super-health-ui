# Super Health, Inc.

This is website for the company Super Health, Inc., where the user(presumably an administrator or provider) can view the company's data on patients and their associated encounters. 

In the header, you can find a link labeled 'Patients' that will lead you to the patients page, where you can see all patients in the database and abbreviated data.

On this page, there is a create button in the top right corner that will lead you a blank form to add a new patient to the database. On the add patient page, there is validation for each field, and if you submit anything invalid, it will instruct you on what is incorrect on the form. If you submit a valid form, a new patient will be created and can be seen on the patients page. If you click cancel, you will also be led back to the patients page. 

On the patients page, each patient card  has a view page icon and a trash icon. If the user clicks the trash icon and the patient does not have associated encounters, the patient will be removed from the database and from the ui. If the patient has associated encounters and the user attempts to delete it, an error message will show up in the patient's card. 

The view page icon will lead you to the patient details page, where you can see all of the patient's information, as well as all associated encounters below the patient details card. On the right hand side of the patient card, there is a pencil icon that will lead you to the edit page, where you can edit all patient information with valid fields. Again, if anything is invalid, an error message will appear. 

Below the patients details page is a card for every encounter, as well as a create button that will lead you to a blank form to create a new encounter. Each encounter field has appropriate validation and error messages for submission.

If you are to direct to a page that does not exist, an alert page will show up with the message "404 not found".

### Node Version Manager (NVM)

NVM is a utility to help you quickly install and switch between Node versions. With NVM, there is no need to manually install and uninstall versions.

Follow the Installation Steps for [NVM on GitHub](https://github.com/coreybutler/nvm-windows).

## Getting Started

### Back-end
* Clone the super-health-api project locally.
[Link to Backend](https://gitlab.ce.catalyte.io/training/cycleworkinggroups/nationwide/associates/chandler-davis/super-health-api)
* Open IntelliJ and run the `AppRunner.java` file
* Proceed to front-end to view

### Front-end
* Clone this project locally.
* CD into the root folder
* Run `npm install` in the root folder to install dependencies.

This command installs a package, and any packages that it depends on.

* Run `npm start`.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Dependencies
* Super Health api must be running on IntelliJ for the application to work
[Link to Download IntelliJ](https://www.jetbrains.com/idea/download/?section=windows)
* This application was built on and runs best in VSCode:
[Link to Download VSCode](https://code.visualstudio.com/download)

## Testing
* You can run tests with coverage via `npm run test:coverage`

## Linting
* You can lint the project with the command `npm run lint`

