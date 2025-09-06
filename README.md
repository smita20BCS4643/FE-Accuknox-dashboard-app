# CNAPP Dashboard React App

## Project Overview

This project is a React-based CNAPP dashboard that dynamically renders categories and widgets from JSON data. Users can add and remove widgets dynamically, search across categories and widgets, and interact with a functional header containing Add Widget, Refresh, More options, and Time Range controls.

## Features

- Dynamic dashboard built from JSON-like structure of categories and widgets.
- Add and remove widgets dynamically in each category.
- Search functionality filters both categories and their widgets live.
- Header with interactive controls (Add Widget, Refresh, More options, Time Range).
- Responsive and accessible UI with keyboard support.
- Local state management using React's `useState`.
- Notifications for user actions.

## Prerequisites

- Node.js (v14 or newer recommended)
- npm or yarn package manager

## Setup & Running Locally

1. Clone this repository:

```
git clone https://github.com/smita20BCS4643/FE-Accuknox-dashboard-app

```
2. Change the Directory 

```
cd FE-Accuknox-dashboard-app

```


2. Install dependencies:

```
npm install
```


3. Run the development server:

```
npm start
```


4. Open your browser to `http://localhost:3000` to view the app.


## Project Structure

- `src/`
  - `App.js`: Root React component rendering the Dashboard.
  - `Dashboard.js`: Main component managing state, search, and modal logic.
  - `NavBar.js`: Top navigation bar with search and notifications.
  - `DashboardHeader.js`: Header controls with interactive buttons & dropdowns.
  - `Category.js`: Displays categories with widgets and modal to add widgets.
  - `Widget.js`: Individual widget with remove functionality.


## How to Use

- Use the search box to filter categories and widgets based on text input.
- Click "Add Widget +" button in header or inside categories to add widgets.
- In the modal, select widgets by tabs and confirm to add.
- Remove widgets by clicking the “x” on the widget.
- Use header controls for refreshing (placeholder alert), options menu, and time range selector.

## Future Enhancements

- Connect refresh and more options buttons to real backend or API.
- Persist state in local storage or backend.
- Enhance widget content with real data and charts.
- Add user authentication and customization.

## Author

**Smita**

- [GitHub Profile](https://github.com/smita20BCS4643)
- [Linkedin Profile](https://www.linkedin.com/in/smita-292363203/)
  
## Contribution

Contributions, issues, and feature requests are welcome!  

Feel free to fork this repo and create pull requests.

---

Give a ⭐️ if you like this project!
