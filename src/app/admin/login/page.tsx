import { signIn } from '../actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-20">
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl font-medium text-moss-dark flex justify-center gap-3 items-center">
          🌿 Leaf & Ridge
        </h1>
        <p className="text-sage mt-2">Admin Dashboard</p>
      </div>

      <form className="flex flex-col w-full justify-center gap-4 bg-paper p-8 rounded-lg border border-line shadow-sm" action={signIn}>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-moss-dark" htmlFor="email">
            Email
          </label>
          <input
            className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss"
            name="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-moss-dark" htmlFor="password">
            Password
          </label>
          <input
            className="border border-line rounded-md px-4 py-2 bg-white focus:outline-none focus:border-moss"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
        
        <button className="bg-moss-dark text-paper rounded-md px-4 py-3 mt-4 text-sm font-medium hover:bg-moss transition-colors">
          Sign In
        </button>
        
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm text-center rounded-md">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
