import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={`group relative overflow-hidden bg-[#111] hover:bg-neutral-800/50 border-neutral-800 p-6 transition-all duration-300 ${className} flex flex-col items-center text-center`}>
    <div className="inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <Icon className="text-orange-500 mb-4 h-6 w-6" />
  
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-neutral-400">{description}</p>
  </Card>
  
  );
}