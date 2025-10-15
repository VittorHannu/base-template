import { Card } from 'fumadocs-ui/components/card';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tighter">
        Project Documentation
      </h1>
      <p className="mb-8 max-w-xl text-lg text-muted-foreground">
        Welcome! This site contains all the documentation for our project, for both users and developers.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl w-full">
        <Card
          href="/users"
          title="User Guide"
          description="Instructions and guides for the end-users of the application. Learn how to use the features and get your work done."
        />
        <Card
          href="/developers"
          title="Developer Guide"
          description="Technical documentation for developers. Includes setup guides, architectural overviews, and component documentation."
        />
      </div>
    </main>
  );
}