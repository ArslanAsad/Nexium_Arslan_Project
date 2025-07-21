import { Lightbulb } from "lucide-react";

export function PitchAILogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Lightbulb className="w-6 h-6 text-primary" />
      <span className="text-lg font-bold">PitchAI</span>
    </div>
  );
}
