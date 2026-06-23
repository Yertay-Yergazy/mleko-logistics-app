type IconName =
  | "phone"
  | "email"
  | "whatsapp"
  | "search"
  | "bell"
  | "plus"
  | "download"
  | "plane"
  | "truck"
  | "ship"
  | "train"
  | "menu"
  | "chevron-left"
  | "chevron-right"
  | "pin-from"
  | "pin-to"
  | "check"
  | "grid"
  | "eye"
  | "document"
  | "user"
  | "gear"
  | "logout";

const paths: Record<IconName, string> = {
  phone: "M4 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1 1 0 0 1-1 1A16 16 0 0 1 3 4a1 1 0 0 1 1-1Z",
  email: "M3 5h18v14H3z M3 5l9 7 9-7",
  whatsapp:
    "M12 3a9 9 0 0 0-7.6 13.8L3 21l4.4-1.4A9 9 0 1 0 12 3Z M8.5 8.7c.2-.5.7-.5 1-.5h.6c.2 0 .5 0 .7.5.3.6 1 1.9 1 2.1s0 .3-.2.5l-.6.6c-.1.1-.1.3 0 .5.3.6 1.6 2 3 2.6.2.1.3 0 .5-.1l.6-.7c.2-.2.4-.2.6-.1l1.8 1c.2.1.3.3.3.5 0 .8-.6 1.6-1.5 1.8-1.6.4-3.7-.3-5.8-2.4-2.1-2-2.8-4-2.4-5.7.1-.5.4-1 .9-1.1Z",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M20 20l-4.3-4.3",
  bell: "M6 9a6 6 0 1 1 12 0v5l2 3H4l2-3Z M10 20a2 2 0 0 0 4 0",
  plus: "M12 5v14M5 12h14",
  download: "M12 4v11m0 0-4-4m4 4 4-4M5 19h14",
  plane: "M3 12.5 21 6l-6.5 18-2-7-7-2L3 12.5Z",
  truck: "M2 7h11v9H2zM13 11h5l3 3v2h-8zM5.5 19a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM16.5 19a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z",
  ship: "M4 19l1.5-6h13L20 19M6 13V6h9l3 3M3 19c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0",
  train: "M5 4h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4ZM5 17l-2 4M19 17l2 4M8 8h8M8 12h8M7 21h10",
  menu: "M4 6h16M4 12h16M4 18h16",
  "chevron-left": "M15 5l-7 7 7 7",
  "chevron-right": "M9 5l7 7-7 7",
  "pin-from": "M12 3a6 6 0 0 0-6 6c0 4.5 6 12 6 12s6-7.5 6-12a6 6 0 0 0-6-6Z M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  "pin-to": "M12 3a6 6 0 0 0-6 6c0 4.5 6 12 6 12s6-7.5 6-12a6 6 0 0 0-6-6Z M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  check: "M5 12l5 5L20 6",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  document: "M6 3h8l4 4v14H6zM14 3v4h4 M9 12h6M9 16h6",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
  gear: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM4 12h2m12 0h2M12 4v2m0 12v2M6.3 6.3l1.4 1.4m8.6 8.6 1.4 1.4M6.3 17.7l1.4-1.4m8.6-8.6 1.4-1.4",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
};

export default function Icon({
  name,
  size = 18,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
