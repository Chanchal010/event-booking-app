# Event Booking System

A modern, responsive web application for event booking with interactive calendar integration, multi-step form validation, and dynamic UI components.

🚀 To visit the live website, click here: [Event Booking](https://event-booking-app-bice.vercel.app/)

## Overview

The Event Booking System is designed for event organizers and venue managers who need a streamlined solution for managing bookings and events. This application addresses the challenge of coordinating event schedules, collecting necessary information from attendees, and providing a visually appealing interface for both users and administrators.

## Features

- **Interactive Calendar Integration**: Select dates with visual indicators for availability and existing events
- **Multi-step Booking Form**: Guided process with validation for personal information and event details
- **Animated Review Section**: Visually appealing summary of booking details before confirmation
- **Dark/Light Theme Support**: Full theme switching with optimized UI for both modes
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop devices
- **Event Management**: View, add, and export events
- **Form Validation**: Client-side validation with helpful error messages
- **Modern UI Components**: Gradient accents, animations, and interactive elements

## Tech Stack

- **Framework**: React.js with Vite for fast development
- **Form Handling**: React Hook Form for validation and state management
- **Calendar**: React Datepicker for date selection
- **Animations**: Framer Motion for smooth transitions and effects
- **Icons**: React Icons for consistent visual elements
- **Styling**: Custom CSS with CSS variables for theming

## Installation and Setup

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/your-username/event-booking-system.git
cd event-booking-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173/)

## Usage Instructions

### Booking an Event

1. **Select a Date**: Click on a date in the calendar to begin the booking process
2. **Personal Information**: Fill out your name, email, and phone number in the first step
3. **Event Details**: Specify event type, number of attendees, and provide a description
4. **Review**: Confirm all details in the animated review section before submission
5. **Confirmation**: Receive confirmation and view your event in the upcoming events list

### Managing Events

- View all upcoming events in the Events page
- Export events to your preferred calendar application using the "Add to Calendar" feature
- Filter events by type, date range, or attendance size

### Theme Switching

Toggle between light and dark mode using the theme switcher in the navigation bar. The UI is carefully designed to provide optimal readability and visual appeal in both modes.

## Configuration Options

### Theme Customization

The application uses CSS variables for theming. These can be modified in the root CSS file:

```css
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --primary-light: #818cf8;
  --primary-rgb: 99, 102, 241;
  
  /* Other color variables */
}

[data-theme="dark"] {
  /* Dark theme variables */
}
```

### Content Customization

Events, event types, and other static content can be configured by modifying the relevant components:

- Event types are defined in `EventForm.jsx`
- Static content such as headings and descriptions can be modified directly in their respective components

## Development Guidelines

### Code Style

This project follows standard React best practices:

- Component-based architecture
- Functional components with hooks
- Separation of concerns between components, styling, and business logic

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

### Coding Standards

- Use consistent indentation (2 spaces)
- Follow naming conventions (camelCase for variables and functions, PascalCase for components)
- Write meaningful comments for complex logic
- Ensure responsive design works across all device sizes

## Testing

The project uses Vite's testing framework. To run tests:

```bash
npm test
# or
yarn test
```

For component testing, focus on:
- Form validation
- Calendar interaction
- Theme switching functionality
- Responsive design breakpoints

## Project Structure

```
event-booking-system/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable components
│   │   ├── calendar/     # Calendar component and styling
│   │   ├── eventForm/    # Multi-step form components
│   │   ├── eventList/    # Event listing components
│   │   └── layout/       # Header, footer, and layout components
│   ├── pages/            # Page components
│   │   ├── Home.jsx      # Homepage
│   │   ├── Events.jsx    # Events listing page
│   │   ├── Auth.jsx      # Authentication router
│   │   ├── Login.jsx     # Login page
│   │   ├── Register.jsx  # Registration page
│   │   └── Pages.css     # Shared page styles
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global styles
│   └── main.jsx          # Application entry point
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Troubleshooting

### Common Issues

- **Calendar Not Showing**: Ensure React Datepicker is properly installed and imported
- **Form Validation Errors**: Check the validation rules in the form component
- **Theme Switching Not Working**: Verify the data-theme attribute is properly toggled

### Browser Compatibility

The application is tested on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React Hook Form](https://react-hook-form.com/) for form validation
- [React Datepicker](https://reactdatepicker.com/) for calendar functionality
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Icons](https://react-icons.github.io/react-icons/) for icon components

## Contact

For questions or support, please contact:
- Email: support@eventbookingsystem.com
- GitHub: [Chanchal Bag](https://github.com/chanchal010)

---

Made with ❤️ by Chanchal Bag
