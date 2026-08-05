"use client";

import { Ban, Pencil, Trash2, type LucideIcon } from "lucide-react";
import { useDemoNotice } from "./DemoProvider";

interface DemoActionButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  iconName?: "edit" | "delete" | "cancel";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string;
}

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
  secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  danger: "border border-red-200 bg-white text-red-600 hover:bg-red-50",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
};

const icons = {
  edit: Pencil,
  delete: Trash2,
  cancel: Ban,
} satisfies Record<NonNullable<DemoActionButtonProps["iconName"]>, LucideIcon>;

export default function DemoActionButton({ children, icon, iconName, variant = "primary", className = "" }: DemoActionButtonProps) {
  const { showDemoNotice } = useDemoNotice();
  const Icon = iconName ? icons[iconName] : icon;
  return (
    <button type="button" onClick={showDemoNotice} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`}>
      {Icon && <Icon size={17} />}
      {children}
    </button>
  );
}
