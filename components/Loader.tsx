// components/ui/TaskHiveLoader.tsx

export default function TaskHiveLoader() {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
        <p className="text-sm text-muted-foreground">
          Loading TaskHive data...
        </p>
      </div>
    </div>
  );
}
