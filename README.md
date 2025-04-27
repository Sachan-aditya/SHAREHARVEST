# ShareHarvest

ShareHarvest is a community-driven platform designed to connect people for sharing surplus food, resources, or harvest from gardens and farms. Our mission is to reduce waste, foster sustainable living, and build stronger communities through collaborative resource sharing.
![ShareHarvest Screenshot](https://github.com/Sachan-aditya/SHAREHARVEST/blob/master/Screenshot%202025-04-27%20140647.png)
## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview
ShareHarvest enables users to list, discover, and exchange surplus resources like homegrown vegetables, canned goods, or unused pantry items. Whether you're a gardener with extra tomatoes or someone looking to share a meal, ShareHarvest makes it easy to connect with your community. The platform is built with simplicity and accessibility in mind, using modern web technologies to ensure a seamless experience across devices.

## Features
- **Resource Listing**: Post surplus items with descriptions, photos, and pickup details.
- **Community Search**: Find available resources in your local area using geolocation or manual search.
- **User Profiles**: Build trust with verified profiles, sharing history, and community ratings.
- **Messaging System**: Communicate directly with other users to coordinate exchanges securely.
- **Sustainability Tracker**: Monitor your impact, including metrics like reduced waste or carbon footprint savings.
- **Mobile-Friendly Design**: Access ShareHarvest on any device with a responsive interface.

## Installation
To run ShareHarvest locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shareharvest/shareharvest.git
   cd shareharvest
   ```

2. **Install Dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) (v16 or higher) and [MongoDB](https://www.mongodb.com/) installed. Then run:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following configuration:
   ```
   DATABASE_URL=mongodb://localhost:27017/shareharvest
   API_KEY=your_api_key_here
   PORT=3000
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Start the MongoDB Server**:
   Ensure MongoDB is running locally:
   ```bash
   mongod
   ```

5. **Run the Application**:
   Start the development server:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` in your browser to view the application.

## Usage
1. **Sign Up**: Create an account using your email or social media login to start sharing or browsing resources.
2. **List an Item**: Navigate to the "Share" section, add details about your surplus item (e.g., type, quantity, condition), and upload a photo.
3. **Browse Resources**: Use the search bar or map view to find items available in your area.
4. **Connect**: Send a message to the lister to arrange pickup or delivery details.
5. **Track Impact**: Visit your profile to view your sharing history and sustainability metrics, such as pounds of food saved from waste.

For a live demo, visit [ShareHarvest Demo](https://shareharvest.example.com) (replace with actual deployment link).

## Contributing
We welcome contributions from the community! To contribute:

1. **Fork the Repository**: Click the "Fork" button on the [ShareHarvest GitHub page](https://github.com/shareharvest/shareharvest).
2. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Changes**: Implement your feature, bug fix, or documentation improvement.
4. **Commit Changes**:
   ```bash
   git commit -m "Add your feature description"
   ```
5. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**: Submit your changes for review via GitHub.

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



Join us in building a more sustainable future with ShareHarvest!
