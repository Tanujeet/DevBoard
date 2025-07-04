import { Card, CardContent } from "@/components/ui/card";

const page = () => {
  const cards = [
    { label: "Total Tasks", value: 120 },
    { label: "Completed Tasks", value: 85 },
    { label: "Active Tasks", value: 35 },
    { label: "Total Projects", value: 15 },
    { label: "Ongoing Projects", value: 10 },
    { label: "Archived Projects", value: 5 },
    { label: "Total Focused Time", value: "25h 30m" },
    { label: "Pomodoro Sessions", value: 50 },
  ];

  return (
    <main className="p-12 space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-2">
          Track your productivity and progress
        </p>
      </section>

      {/* Overview Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <Card
              className="hover:shadow-md transition-shadow duration-200"
              key={index}
            >
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;
