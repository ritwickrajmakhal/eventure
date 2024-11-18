<div align="center">

# Eventure Backend

[![Eventure Website](https://img.shields.io/website?url=https://eventure-backend.azurewebsites.net)](https://eventure-backend.azurewebsites.net)

</div>

## Table of Contents

- [Eventure Backend](#eventure-backend)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup Instructions](#setup-instructions)
  - [Contributors](#contributors)
  - [Contributing](#contributing)
  - [Support](#support)

## Overview

The **Eventure Backend** powers the Eventure platform, built using the Strapi headless CMS and hosted on Azure App Services. This repository contains all the backend logic and configurations necessary for managing the project’s content and API. It integrates features like email notifications via Azure Email Service and location services using the Google Maps API.

## Installation

Follow the steps below to set up the project locally.

### Prerequisites

Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (version 6 or later)
- [PostgreSQL](https://www.postgresql.org/download/) (version 13 or later)
- [Azure Email Service](https://market.strapi.io/providers/strapi-provider-email-azure) (optional, required for email functionality)
- [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) (optional, needed for location services)

### Setup Instructions

1. **Clone the Repository**  
   Download the project and move into the project directory:

   ```bash
   git clone https://github.com/ritwickrajmakhal/eventure-backend.git
   cd eventure-backend
   ```

2. **Install Dependencies**  
   Run the following command to install all the necessary dependencies:

   ```bash
   npm install
   ```

3. **Database Configuration**  
   Create a new PostgreSQL database locally or on your preferred cloud platform.

4. **Azure Email Service Setup (Optional)**  
   If you plan to use email notifications, configure an Azure Email Service account and note down the credentials.

5. **Configure Environment Variables**  
   Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   HOST=0.0.0.0
   PORT=1337
   URL=http://localhost:1337
   APP_KEYS=<your_app_keys>
   API_TOKEN_SALT=<your_api_token_salt>
   ADMIN_JWT_SECRET=<your_admin_jwt_secret>
   TRANSFER_TOKEN_SALT=<your_transfer_token_salt>
   JWT_SECRET=<your_jwt_secret>

   # Database
   DATABASE_CLIENT=postgres
   DATABASE_NAME=<your_database_name>
   DATABASE_USERNAME=<your_database_username>
   DATABASE_PASSWORD=<your_database_password>

   # Email
   ENABLE_EMAIL_FROM_AZURE=true
   AZURE_ENDPOINT=<your_azure_endpoint>
   EMAIL_SERVICE_ADDRESS=<your_email_service_address>
   FALLBACK_EMAIL=<your_fallback_email>

   STORAGE_URL=http://localhost:1337
   ```

6. **Start the Development Server**  
   Launch the backend by running the following command:

   ```bash
   npm run develop
   ```

   The backend should now be running locally at `http://localhost:1337`.

7. **Access the Admin Panel**  
   To access Strapi’s admin dashboard, open your browser and navigate to:

   ```bash
   http://localhost:1337/admin
   ```

## Contributors

Contributions to the Eventure Backend are made by developers from the community. To view a complete list of contributors, visit our [contributors page](https://github.com/ritwickrajmakhal/eventure/graphs/contributors).

<a href="https://github.com/ritwickrajmakhal/eventure/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=ritwickrajmakhal/eventure-backend" alt="Contributors"/>
</a>

This image is powered by [contributors-img](https://contributors-img.web.app).

## Contributing

We welcome contributions from developers interested in improving Eventure! Here’s how you can contribute:

1. **Fork** the repository.
2. **Create a new branch** for your feature or fix:

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Commit your changes** with a clear message:

   ```bash
   git commit -m "Add feature: your-feature"
   ```

4. **Push to your branch**:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a **Pull Request** and wait for feedback or approval.

## Support

If you have any questions, issues, or suggestions, feel free to open an issue on GitHub or reach out to any of the contributors. We're happy to help!
