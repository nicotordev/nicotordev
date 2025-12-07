export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-neutral-500">404</p>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900">
          Page not found
        </h1>
        <p className="mt-2 text-neutral-600">
          We couldn&apos;t find what you were looking for. Please check the URL
          or head back to the homepage.
        </p>
      </div>
    </main>
  );
}
