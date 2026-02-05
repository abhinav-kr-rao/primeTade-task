import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">

        <p className="mt-3 text-2xl text-gray-600">
          Task Management System
        </p>

        <div className="flex text-black flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link
            href="/login"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 bg-white shadow-sm hover:shadow-md transition-all"
          >
            <h3 className="text-2xl font-bold">Login &rarr;</h3>
            <p className="mt-4 text-xl">
              Access your dashboard to manage tasks.
            </p>
          </Link>

          <Link
            href="/register"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-green-600 focus:text-green-600 bg-white shadow-sm hover:shadow-md transition-all"
          >
            <h3 className="text-2xl font-bold">Register &rarr;</h3>
            <p className="mt-4 text-xl">
              Create a new account to get started.
            </p>
          </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-gray-500">
          Built with Next.js, Prisma, and Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
