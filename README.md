# QuestionYoucat

QuestionYoucat is an interactive quiz application that allows users to test their knowledge through customized exams. Users can create personalized quizzes, track their progress, and improve their understanding of various topics.

## Features

- **User Authentication**: Register, login, and manage your profile
- **Custom Exam Creation**: Create personalized exams by selecting topics, difficulty levels, and number of questions
- **Interactive Quiz Taking**: Take quizzes with a user-friendly interface and timer
- **Performance Tracking**: View detailed results and track your progress over time
- **Responsive Design**: Access the application on any device with a fully responsive design

## Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Material UI
  - React Router
  - React Hook Form
  - Axios

- **Development Tools**:
  - Vite
  - ESLint
  - TypeScript

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/question-youcat.git
   cd question-youcat
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=http://localhost:8000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── apis/           # API services for backend communication
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Reusable UI components
├── context/        # React context providers
├── hooks/          # Custom React hooks
├── layouts/        # Page layout components
├── pages/          # Page components
│   ├── auth/       # Authentication pages
│   ├── exam/       # Exam related pages
│   ├── home/       # Home page
│   └── profile/    # User profile page
├── theme/          # Material UI theme configuration
└── utils/          # Utility functions
```

## Building for Production

To build the application for production:

```
npm run build
# or
yarn build
```

The build files will be located in the `dist` directory.

