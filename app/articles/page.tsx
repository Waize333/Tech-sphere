export default function ArticlesPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
        <div className="grid gap-6">
          <div className="p-6 bg-card rounded-lg shadow-md">
            <p className="text-lg text-muted-foreground">Articles will be displayed here soon.</p>
          </div>
        </div>
      </div>
    );
  }