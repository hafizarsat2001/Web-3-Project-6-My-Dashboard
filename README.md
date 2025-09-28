# My Dashboard

A simple dashboard web application built with Svelte and Firebase.

## Features
- User authentication
- Dashboard UI
- Real-time activity feed
- Quick actions for adding activities
- Responsive design with Bootstrap
- Firebase Firestore integration

## Setup Instructions

### Step 1: Firebase Configuration
Before running the application, you need to set up Firebase:

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password method)
3. Enable Firestore Database
4. Copy your Firebase configuration object
5. Replace the placeholder configuration in `src/firebase.js` with your actual Firebase config

### Step 2: Firestore Security Rules
Set up the following security rules in your Firestore Database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Activities collection - users can only access their own activities
    match /activities/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Notifications collection - users can only access their own notifications
    match /notifications/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```
## Getting Started

### Prerequisites
- Node.js (v16 or above recommended)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Web-3-Project-6-My-Dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or as indicated in the terminal).

## Project Structure
```
src/
├── lib/                    # Reusable components
│   ├── Navbar.svelte      # Navigation bar
│   ├── DashboardCard.svelte # Dashboard metric cards
│   ├── ActivityFeed.svelte  # Real-time activity feed
│   └── QuickActions.svelte  # Quick action buttons
├── routes/                 # Page components
│   ├── index.svelte       # Main dashboard
│   ├── login.svelte       # Login page
│   ├── signup.svelte      # Sign up page
│   └── __layout.svelte    # Layout with auth guard
├── stores/                 # Svelte stores
│   └── authStore.js       # Authentication state
└── firebase.js            # Firebase configuration
```

## Features Overview

### Authentication
- Email/password authentication with Firebase Auth
- Protected routes with authentication guards
- Automatic redirects based on auth state
- User session management

### Dashboard
- Real-time activity feed using Firestore listeners
- Interactive dashboard cards with metrics
- Quick actions for adding new activities
- Responsive design that works on all devices

### Components
- **Navbar**: Navigation with user dropdown and logout
- **DashboardCard**: Reusable metric display cards
- **ActivityFeed**: Real-time list of user activities
- **QuickActions**: Modal-based activity creation

## Project Structure
- `src/` - Source code
  - `routes/` - Svelte routes
  - `stores/` - Svelte stores (e.g., authentication)
  - `firebase.js` - Firebase configuration

## Next Steps
After setting up Firebase configuration, you can:
1. Test user registration and login
2. Add activities through the Quick Actions panel
3. View real-time updates in the activity feed
4. Explore the responsive dashboard design

## License
MIT 