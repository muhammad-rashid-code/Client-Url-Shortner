# URL Shortener Client

This is the client-side application for the **URL Shortener API**. It provides a user-friendly interface to shorten long URLs and displays the shortened URL once generated. The client is built using **React** and communicates with the backend server to handle URL shortening.

---

## Features

- **URL Shortening**: Enter a long URL and get a shortened version.
- **Error Handling**: Displays error messages for invalid inputs or server errors.
- **Loading State**: Shows a loading animation while the URL is being shortened.
- **Responsive Design**: Works seamlessly across different screen sizes.
- **User-Friendly Interface**: Simple and intuitive UI for easy usage.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/) (optional)

---

## Installation

1. **Clone the repository** (if applicable):

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   If your client requires environment variables (e.g., API base URL), create a `.env` file in the root directory and add the necessary variables.

   Example:

   ```env
   REACT_APP_API_BASE_URL=https://server-url-shortner.vercel.app
   ```

4. **Start the development server**:

   ```bash
   npm start
   ```

   The application will start running on `http://localhost:3000`.

---

## Usage

1. **Enter a URL**:
   - In the input field, enter the long URL you want to shorten.
   - Example: `https://example.com/very-long-url`.

2. **Shorten the URL**:
   - Click the **"Shorten URL"** button.
   - The application will send a request to the backend server and display the shortened URL once it's ready.

3. **View the Shortened URL**:
   - The shortened URL will be displayed below the input field.
   - Example: `http://localhost:3000/url/abc123`.

4. **Error Handling**:
   - If the input is invalid or the server encounters an error, an error message will be displayed.

5. **Loading State**:
   - While the URL is being shortened, a loading animation will be shown.

---

## Components

### `InputComp`

- **Description**: The main component for the URL shortening functionality.
- **Features**:
  - Input field for entering the long URL.
  - Button to trigger the shortening process.
  - Displays the shortened URL or error messages.
  - Shows a loading animation during the shortening process.

### `ButtonComp`

- **Description**: A reusable button component.
- **Usage**: Used to trigger the URL shortening process.

### `ShortenURLdiv`

- **Description**: Displays the shortened URL.
- **Usage**: Rendered once the shortened URL is available.

---

## Styling

The application uses **CSS modules** for styling. The styles are located in the `styles` folder and are scoped to their respective components.

---

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding! 🚀
