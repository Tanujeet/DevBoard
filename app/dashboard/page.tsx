"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = () => {
  const [stats, setstats] = useState({
    totaltask: 0,
    Completed: 0,
    PomodoroMinutes: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await fetch("api/summary");
      const data = await res.json();
      setstats(data);
    };
    fetchSummary();
  }, []);

  const cards = [
    { title: "Total Task", value: stats.totaltask },
    { title: "Completed", value: stats.Completed },
    { title: "Pomodoro Minutes", value: stats.PomodoroMinutes },
  ];
  const recentTasks = [
    { name: "Finish blog post", status: "In Progress", dueDate: "July 2" },
    { name: "Push repo", status: "Completed", dueDate: "June 30" },
    { name: "Team Meeting", status: "Pending", dueDate: "July 3" },
  ];

  const { user } = useUser();
  const userName = user?.firstName || "Developer";
  return (
    <main className="max-w-6xl mx-auto px-4">
      <div className="text-center text-3xl sm:text-4xl space-y-8 p-6">
        <h2>
          Hi {userName}, Ready to Crush <br /> tasks today?
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-full max-w-[220px] aspect-square mx-auto"
            >
              <StaticCard title={card.title} value={card.value} />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tasks Section */}
      <section className="mt-10">
        <div className="text-2xl font-semibold mb-4 pl-2 sm:pl-4">
          Recent Task
        </div>

        <Table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-xl font-semibold text-left p-4">
                Task Name
              </TableHead>
              <TableHead className="text-xl font-semibold text-left p-4">
                Status
              </TableHead>
              <TableHead className="text-xl font-semibold text-left p-4">
                Due
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentTasks.map((task, idx) => (
              <TableRow
                key={idx}
                className="text-lg even:bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <TableCell className="p-4">{task.name}</TableCell>
                <TableCell className="p-4">{task.status}</TableCell>
                <TableCell className="p-4">{task.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
};

const StaticCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="rounded-xl p-4 border border-black hover:bg-black hover:text-white transition">
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font bold">{value}</h2>
    </div>
  );
};
export default page;
