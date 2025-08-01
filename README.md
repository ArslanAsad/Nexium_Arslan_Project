# PitchAI - AI-Powered Pitch Generation Platform

PitchAI is a modern web application that helps entrepreneurs and innovators generate compelling, AI-powered pitches tailored to any audience and tone. Built with Next.js 15, TypeScript, and a hybrid authentication/database architecture.

## 🚀 Features

- **AI-Powered Pitch Generation**: Generate personalized pitches using advanced AI through n8n webhooks
- **Multiple Tone Options**: Choose from professional, investor-focused, technical, casual, and friendly tones
- **User Authentication**: Secure magic link authentication via Supabase
- **Pitch Management**: Save, view, search, filter, and delete your generated pitches
- **Responsive Design**: Modern, mobile-first design
- **Real-time Updates**: Live feedback and loading states throughout the application

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI component library
- **Framer Motion** - Smooth animations and transitions
- **Sonner** - Beautiful toast notifications

### Backend & Database

- **Supabase** - Authentication and user management
- **MongoDB** - Primary database for pitch storage
- **Mongoose** - MongoDB object modeling
- **n8n Webhook** - External AI service for pitch generation

### Deployment

- **Vercel** - Hosting and deployment platform
- **Environment Variables** - Secure configuration management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+
- npm or yarn package manager
- A Supabase account and project
- A MongoDB database (Atlas recommended)
- Access to the n8n webhook endpoint

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pitchai.git
cd pitchai
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string
```

### 4. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Authentication → Settings → Auth
3. Enable "Email OTP" authentication
4. Add your redirect URLs:
   - For development: `http://localhost:3000/dashboard`
   - For production: `https://your-domain.com/dashboard`
5. Copy your project URL and anon key to the environment variables

### 5. MongoDB Setup

1. Create a MongoDB database (recommended: MongoDB Atlas)
2. Create a database user with read/write permissions
3. Get your connection string and add it to `MONGODB_URI`
4. The application will automatically create the required collections

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
pitchai/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── pitches/              # Pitch CRUD operations
│   ├── dashboard/                # Protected dashboard pages
│   │   ├── history/              # Pitch history page
│   │   └── layout.tsx            # Dashboard layout with sidebar
│   ├── login/                    # Authentication pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable components
│   ├── ui/                       # Shadcn/ui components
│   ├── app-sidebar.tsx           # Dashboard sidebar
│   ├── pitch-ai-logo.tsx         # Logo component
│   └── theme-provider.tsx        # Dark mode provider
├── lib/                          # Utility libraries
│   ├── supabase/                 # Supabase client configurations
│   ├── mongodb.ts                # MongoDB connection
│   └── utils.ts                  # Utility functions
├── models/                       # Database models
│   └── Pitch.ts                  # Pitch model schema
└── hooks/                        # Custom React hooks
```

## 🔐 Authentication Flow

1. **Magic Link Authentication**: Users enter their email on the login page
2. **Email Verification**: Supabase sends a magic link to the user's email
3. **Automatic Redirect**: Clicking the link authenticates the user and redirects to the dashboard
4. **Session Management**: Supabase handles session persistence and renewal
5. **Protected Routes**: Dashboard pages check authentication status

## 💾 Database Schema

### Pitch Model (MongoDB)

```typescript
interface IPitch {
  userId: string; // Supabase user ID
  content: string; // JSON string containing pitch data
  createdAt: Date; // Timestamp
}
```

The `content` field stores a JSON string with the following structure:

```json
{
  "idea": "Business idea description",
  "tone": "professional",
  "pitch": "Generated pitch content...",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

## 🤖 AI Integration

The application integrates with an external n8n webhook for AI pitch generation:

- **Endpoint**: `https://n8n-rfho.onrender.com/webhook/generate-pitch`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "idea_description": "Your business idea...",
    "tone": "professional"
  }
  ```
- **Response**:
  ```json
  {
    "idea": "Processed idea title",
    "tone": "professional",
    "pitch": "Generated pitch content..."
  }
  ```

## 📱 Key Features Implementation

### Pitch Generation

- Form validation ensures required fields are filled
- Loading states provide user feedback during generation
- Generated pitches are automatically saved to MongoDB
- Copy-to-clipboard functionality for easy sharing

### Pitch Management

- **Dashboard**: Shows 3 most recent pitches with quick actions
- **History Page**: Complete pitch library with search and filtering
- **Search**: Full-text search across pitch titles and content
- **Filtering**: Filter by tone type
- **Deletion**: Secure deletion with user confirmation

### User Experience

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Smooth transitions using Framer Motion
- **Loading States**: Skeleton screens and spinners throughout
- **Error Handling**: Comprehensive error messages and fallbacks

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add all environment variables in Vercel dashboard
3. **Deploy**: Vercel automatically builds and deploys your application
4. **Custom Domain**: Configure your custom domain in Vercel settings

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_key
MONGODB_URI=your_production_mongodb_uri
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js recommended rules
- **Prettier**: Code formatting (configure as needed)
- **Husky**: Git hooks for pre-commit checks (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/ArslanAsad/Nexium_Arslan_Project/issues) page
2. Create a new issue with detailed information
3. Include error messages, browser console logs, and steps to reproduce

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com/) - Platform for frontend frameworks and static sites

---

**Built by [Arslan Asad]**

```

This README provides comprehensive documentation covering:

1. **Project Overview**: Clear description of what PitchAI does
2. **Tech Stack**: Complete list of technologies used
3. **Installation Guide**: Step-by-step setup instructions
4. **Project Structure**: Detailed file organization
5. **Authentication Flow**: How the magic link system works
6. **Database Schema**: MongoDB structure explanation
7. **AI Integration**: How the n8n webhook works
8. **Feature Implementation**: Key functionality explanations
9. **Deployment Guide**: Production deployment instructions
10. **Development Info**: Scripts and code quality tools
11. **Contributing Guidelines**: How others can contribute

The README is well-structured with clear sections, code examples, and proper markdown formatting that will display beautifully on GitHub or any markdown viewer.
```
