import RoadmapGenerator from "./_components/roadmap-generator";

export default function RoadmapPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">
          Roadmap Generator
        </h1>
      </div>
      <div className="space-y-6">
        <RoadmapGenerator />
      </div>
    </div>
  );
}
