# Discord profile card

A web application that generates PNG images simulating Discord profile cards

## Features

-   Generate Discord-style profile cards as PNG images

-   Fetch data from Discord API using a bot token

-   Lightweight and fast rendering

## Prerequisites

-   Node.js 18+

-   PNPM installed globally

-   A Discord bot with a valid `BOT_TOKEN`

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/RetrozDev/discord-profile-card.git
    ```
2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Create a `.env` file in the project root and add your Discord bot token:

    ```properties
    BOT_TOKEN=your_discord_bot_token
    ```

4. Run the development server:
    ```bash
    pnpm run dev
    ```

## Usage

-   Open the Open the URL in your browser with a Discord user ID:
    `http://127.0.0.1:3000/<user_id>`

-   The server fetches the user's data via Discord API and returns a PNG profile card.

## Contributing 
Contributions are welcome!
Open issues or submit pull requests.

## License
This project is licensed under the MIT License.