
# React Todo-List APP

This is a simple **React** app for managing items (like a To-Do list) with features such as **adding**, **editing**, **deleting**, **searching**, and **marking items as checked**. The app interacts with a backend server (`json-server`) to persist the data.

## Features
- Add a new item with a name.
- Edit an existing item.
- Delete items.
- Mark items as checked.
- Search through items.
- Fetch items from the server.

## Tech Stack
- **Frontend:** React, HTML, CSS
- **Backend:** json-server (for local mock database)
- **API:** RESTful API using JSON

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/react-item-management.git
cd react-item-management
```

### 2. Install dependencies

Run the following command to install the required dependencies for the frontend:

```bash
npm install
```

To run the backend, you will need `json-server`. Install it globally or locally.

#### Install json-server globally:

```bash
npm install -g json-server
```

#### Or install json-server locally:

```bash
npm install json-server --save-dev
```

### 3. Setup the Backend

Create a file called `db.json` in the root directory (same level as `package.json`) and add the following structure:

```json
{
  "items": [
    { "id": 1, "itemname": "Sample Item", "check": false }
  ]
}
```

### 4. Run the App

#### 4.1. Start the backend server

Start the backend server by running:

```bash
json-server --watch db.json --port 3500
```

#### 4.2. Start the frontend app

Now, start the React app in development mode:

```bash
npm start
```

This will launch the app at `http://localhost:3000` and the backend server at `http://localhost:3500`.

### 5. Usage

- **Add Item:** Enter the item name and press `Enter` or click "Add Item".
- **Edit Item:** Click the "Edit" button next to the item you want to edit, make changes, and click "Save".
- **Delete Item:** Click the "Delete" button next to the item you want to remove.
- **Check Item:** Click the checkbox to mark the item as completed or uncompleted.
- **Search Items:** Type in the search bar to filter items by their name.

## Error Handling
- If an error occurs during any operation (like adding, updating, or deleting), an error message will be displayed on the screen.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
