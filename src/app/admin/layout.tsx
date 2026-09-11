import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col bg-putty-deep/20">
      {user && (
        <header className="py-4 px-6 md:px-12 bg-paper border-b border-line flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-serif font-medium text-moss-dark flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <span className="hidden sm:inline">Leaf & Ridge</span>
            </Link>
            <nav className="flex gap-4 border-l border-line pl-6">
              <Link href="/admin" className="text-sm font-medium text-moss-dark hover:text-ochre">Plants</Link>
              <Link href="/admin/settings" className="text-sm font-medium text-moss-dark hover:text-ochre">Settings</Link>
            </nav>
          </div>
          
          <form action="/auth/signout" method="post">
            <button className="text-sage hover:text-moss-dark flex items-center gap-2 text-sm">
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </header>
      )}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
