# 🏥 VitaMend - Medicine Donation Platform

<div align="center">
  <img src="public/logo.png" alt="VitaMend Logo" width="120" height="120">
  
  <h3>Reviving Medicines, Restoring Lives</h3>
  
  <p>A revolutionary platform connecting unused medicines with those in need, reducing medical waste while improving healthcare access.</p>

  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/vitamend)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
</div>

## 🌟 Features

- 🤖 **AI-Powered Verification** - Advanced medicine quality checking
- 💊 **Secure Donation Process** - Safe and transparent workflow  
- 📊 **Real-time Impact Tracking** - See your donation's impact
- 👥 **Multi-role System** - Donors, volunteers, NGOs, admins
- 📱 **Mobile Responsive** - Works on all devices
- 🔐 **Secure Authentication** - Google OAuth & credentials
- 🌍 **Sustainability Focus** - Reduce medical waste

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/vitamend.git
   cd vitamend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`
   
   Edit `.env.local`:
   \`\`\`env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **File Storage**: Vercel Blob
- **Deployment**: Vercel

## 📱 Screenshots

### Homepage
Beautiful, responsive landing page with clear call-to-actions

### Donation Flow  
Intuitive medicine donation process with AI verification

### Dashboard
Comprehensive user dashboard with impact tracking

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

If you find this project helpful, please give it a ⭐ on GitHub!

For support:
- 📧 Email: support@vitamend.org
- 💬 GitHub Issues: [Create an issue](https://github.com/yourusername/vitamend/issues)

---

<div align="center">
  <p>Built with ❤️ for a better, more sustainable healthcare system</p>
  <p><strong>VitaMend</strong> - Making healthcare accessible to all</p>
</div>
