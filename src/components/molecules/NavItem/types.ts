import { type ReactNode } from "react";
import { type IconType } from "react-icons";

export interface NavItemProps {
  href: string;
  icon: IconType;
  activeIcon: IconType;
  children: ReactNode;
}
