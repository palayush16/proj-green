# Leaf & Ridge

A small family-run plant nursery web app built with Next.js and Supabase.

## Setup Instructions

1. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Supabase Setup**
   - Create a new project on [Supabase](https://supabase.com).
   - Go to the SQL Editor in your Supabase dashboard and run the contents of \`supabase/schema.sql\`.
   - Go to Authentication -> Providers and enable Email auth. Disable "Confirm email" if you want simple login without verification.
   - Go to Storage and create a new public bucket named \`plants\`.
   - Go to Authentication -> Users and create 2 users for the admin dashboard.

3. **Environment Variables**
   - Copy \`.env.example\` to \`.env.local\`.
   - Fill in your \`NEXT_PUBLIC_SUPABASE_URL\` and \`NEXT_PUBLIC_SUPABASE_ANON_KEY\` from the API settings in your Supabase dashboard.

4. **Run the App**
   \`\`\`bash
   npm run dev
   \`\`\`
   The app will be running on [http://localhost:3000](http://localhost:3000).

## Deployment

Deploy this app on [Vercel](https://vercel.com) by connecting your GitHub repository and adding the Supabase environment variables in the Vercel dashboard.
