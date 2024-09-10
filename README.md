<div align="center">
  
# EVENTURE

[![Eventure Website](https://img.shields.io/website?url=https://eventure-ten.vercel.app/)](https://eventure-ten.vercel.app/)

</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Step-by-step Guide](#step-by-step-guide)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Production Build](#production-build)
- [Current Contributors](#current-contributors)
- [Contributing ](#contributing-)
- [Questions?](#questions)

## Overview

EVENTURE simplifies event creation, registration, and management by offering an intuitive web interface with integration of multiple third-party services like GitHub, Google, and Azure Bot Service. It's designed to scale for both small and large events, allowing for easy event discovery and user interaction.

## Features

- **User Authentication:** Supports OAuth authentication with GitHub and Google.
- **Event Management:** Organize, manage, and participate in events seamlessly.
- **API Integration:** Fetch event data from Strapi API for dynamic updates.
- **Chatbot Integration:** Integrated with Azure Bot Service for enhanced user support.
- **Developer Friendly:** Easily customizable with clear documentation and environment configurations.

## Tech Stack

- **Frontend:** Next.js (React Framework)
- **Backend:** Strapi CMS
- **Authentication:** NextAuth.js (OAuth with GitHub, Google)
- **Database:** PostgreSQL (through Strapi)
- **Deployment:** Vercel
- **Bot Service:** Azure Bot Service
- **Version Control:** GitHub

## Installation

To get a local copy of this project up and running, follow these simple steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) (v6+)

### Step-by-step Guide

1. **Clone the repository**

   ```bash
   git clone https://github.com/ritwickrajmakhal/eventure.git
   cd eventure
   ```

2. **Install the dependencies**

   Ensure that all dependencies required for the project are installed by running the following command in the project directory:

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory of the project and add the following environment variables:

   ```bash
   NEXT_PUBLIC_CHATBOT_SECRET_KEY=your_chatbot_api_key_from_azure_bot_service
   GITHUB_ID=your_github_oauth_app_id
   GITHUB_SECRET=your_github_oauth_app_secrate
   GOOGLE_ID=your_google_oauth_app_id
   GOOGLE_SECRET=your_google_oauth_app_secrate
   NEXTAUTH_URL=http://localhost:3000/
   NEXTAUTH_SECRET=any_random_string
   NEXT_PUBLIC_API_URL=strapi_api_url
   ```

   - Replace `your_chatbot_api_key_from_azure_bot_service`, `your_github_oauth_app_id`, `your_google_oauth_app_id`, and other values with the appropriate credentials for your services.

4. **Start the development server**

   After setting up your environment variables, start the development server with the following command:

   ```bash
   npm run dev
   ```

   This command will run the project on `http://localhost:3000/`.

## Environment Variables

| Variable Name                  | Description                                                    |
| ------------------------------ | -------------------------------------------------------------- |
| NEXT_PUBLIC_CHATBOT_SECRET_KEY | API key for the Azure chatbot service                          |
| GITHUB_ID                      | GitHub OAuth application ID                                    |
| GITHUB_SECRET                  | GitHub OAuth application secret                                |
| GOOGLE_ID                      | Google OAuth application ID                                    |
| GOOGLE_SECRET                  | Google OAuth application secret                                |
| NEXTAUTH_URL                   | URL for NextAuth, typically `http://localhost:3000/` for local |
| NEXTAUTH_SECRET                | Secret key for NextAuth session management                     |
| NEXT_PUBLIC_API_URL            | Strapi API URL for fetching event-related data                 |

Make sure that your `.env.local` file is never pushed to version control, as it contains sensitive information.

## Usage

Once you have the development server running, navigate to `http://localhost:3000/` to start using the application.

### Production Build

To build and start the app in production mode, use the following commands:

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the application in production mode:
   ```bash
   npm run start
   ```

## Current Contributors

<a href="https://github.com/ritwickrajmakhal/eventure/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=ritwickrajmakhal/eventure" alt="Contributors Image"/>
</a>

Made with [contributors-img](https://contributors-img.web.app).

## Contributing <a name="contributing"></a>

We welcome contributions from the community. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m "Added new feature"`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## Questions?

If you have any questions or run into any issues, feel free to open an issue or reach out to the contributors!
