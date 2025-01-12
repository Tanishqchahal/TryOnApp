# Vastrai Fashion Project

## Problem Statement
The fashion industry is constantly evolving, and customers are looking for innovative ways to try on clothes virtually before making a purchase. Traditional online shopping lacks the ability to visualize how clothing items will look on a person, leading to uncertainty and potential dissatisfaction.

## Solution
Vastrai offers an AI-powered virtual try-on solution that allows users to visualize clothing items on models or themselves. By integrating advanced image processing and machine learning techniques, Vastrai provides a seamless and interactive shopping experience. The platform includes features like:
- Virtual try-on for various clothing items
- A dynamic hero section with promotional slides
- A modern and responsive design with a warm color theme

## Code Structure

### Components
- **Hero.tsx**: Implements the hero banner with a slideshow of promotional images and text. It includes navigation arrows and indicators for a smooth user experience.
- **ProductPage.tsx**: Displays product details and integrates the virtual try-on feature.
- **Models.tsx**: Allows users to select a model for the virtual try-on experience.

### Services
- **tryOnService.ts**: Handles API interactions for the virtual try-on feature, including token generation and result polling.

### Context
- **CartContext.tsx**: Manages the shopping cart state across the application.

### Configuration
- **tailwind.config.js**: Configures Tailwind CSS with custom color themes and responsive design settings.

## Getting Started
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the development server with `npm run dev`.
4. Open the application in your browser to explore the features.

## Technologies Used
- React: For building the user interface
- Tailwind CSS: For styling and responsive design
- Axios: For making API requests
- JWT-Encode: For generating JSON Web Tokens

## Future Enhancements
- Add user authentication for personalized experiences
- Expand the virtual try-on feature to include more clothing categories
- Integrate social sharing options for users to share their try-on results

Feel free to explore the code and contribute to the project! If you have any questions or feedback, please reach out.
