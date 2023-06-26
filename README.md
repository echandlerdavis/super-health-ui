# Home Bookings, Inc.

This is website for the company Hotel Bookings, Inc., where the user can view the company's data on reservations and room-types. 

The reservation and room-type links are in the header. When you click on "Reservations", you can see a list of all the current reservations in the company's database.

Each reservation card has a pencil and trash icon. The trash icon deletes the reservation from the database and it will no longer appear on the page. The pencil icon will lead you to the edit page, where you can update the information from a form that has the previous information filled out. At the top of the page there is a create button that leads to a form where you can save a new reservation. 

When you click on the "Room-types" button in the header, it will lead you to a page with all room-types, active or inactive. Each reservation card has a pencil icon that leads to the edit page with all the previous information filled out. The top of the page has a create button that will lead you to a blank form to create a new room-type. 

If you are to direct to a page that does not exist, an alert page will show up with the message "404 not found".

### Node Version Manager (NVM)

NVM is a utility to help you quickly install and switch between Node versions. With NVM, there is no need to manually install and uninstall versions.

Follow the Installation Steps for [NVM on GitHub](https://github.com/coreybutler/nvm-windows).

## Getting Started

### Back-end
* Clone the hotel-api project locally.
* Open IntelliJ and run the `HotelApiApplication.java` file
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
* Hotel Bookings api must be running for the application to work

## Testing
* You can run tests with coverage via `npm run test:coverage`

## Linting
* You can lint the project with the command `npm run lint`

