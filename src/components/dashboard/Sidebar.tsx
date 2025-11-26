"use client";

import Link from "next/link";
import LogoutButton from "../LogoutButton";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard" },
  { name: "Shared World", href: "/world" },
  { name: "Profile", href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-800 h-full flex flex-col border-r border-gray-700">
      <div className="p-4 text-xl font-semibold">Builder Studio</div>

      <nav className="flex-1 px-2 space-y-2 mt-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded transition ${
              pathname === link.href
                ? "bg-indigo-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="p-4">
        <LogoutButton />
      </div>
    </div>
  );
}
