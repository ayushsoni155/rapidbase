import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CirclePlay } from "lucide-react";

const Hero07 = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-2 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.2}
        duration={1}
        repeatdelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />
      <div className="relative z-10 text-center max-w-2xl">
        <Badge
          className="bg-gradient-to-br via-70% from-primary  to-primary rounded-full py-1 border-none">
          Just released v1.0.0
        </Badge>

        <h1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          Build Databases & Dashboards — <br /> In Minutes, Not Weeks
        </h1>

        <p className="mt-6 text-[17px] md:text-lg">
          RapidBase lets you create databases, auto-generated dashboards, and REST APIs —
          all without writing code. From schema design to data visualization,
          everything is instant, intuitive, and built for teams.
        </p>

        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            Get Started <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none">
            <CirclePlay className="!h-5 !w-5" /> Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero07;
