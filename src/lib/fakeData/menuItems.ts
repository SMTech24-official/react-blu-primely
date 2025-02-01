import {
  Award,
  ChartColumnDecreasing,
  LandPlot,
  LayoutDashboard,
  Shapes,
  Swords,
  WalletMinimal,
} from "lucide-react";

export const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Swords, label: "Tournament", href: "/dashboard/tournaments" },
  { icon: LandPlot, label: "Fixtures", href: "/dashboard/fixture" },
  { icon: Shapes, label: "User & Clan", href: "/dashboard/user-clan" },
  {
    icon: ChartColumnDecreasing,
    label: "Leaderboards",
    href: "/dashboard/leaderBoards",
  },
  { icon: Award, label: "Award", href: "/dashboard/award" },
  { icon: WalletMinimal, label: "Payment", href: "/dashboard/payment" },
];
