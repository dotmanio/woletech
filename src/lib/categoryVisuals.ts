import {
  Smartphone,
  Laptop,
  Speaker,
  Cable,
  Gamepad2,
  Package,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_VISUALS: Record<
  string,
  { icon: LucideIcon; gradient: string }
> = {
  Phones: { icon: Smartphone, gradient: "from-blue/25 to-purple/15" },
  Laptops: { icon: Laptop, gradient: "from-purple/25 to-blue/15" },
  Speakers: { icon: Speaker, gradient: "from-amber/20 to-purple/15" },
  Accessories: { icon: Cable, gradient: "from-green/20 to-blue/15" },
  "Games & Console": { icon: Gamepad2, gradient: "from-purple/25 to-amber/15" },
};

export function categoryVisual(category: string) {
  return CATEGORY_VISUALS[category] ?? { icon: Package, gradient: "from-blue/20 to-purple/15" };
}
