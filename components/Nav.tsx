import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Nav() {
  const navList = [
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: "About",
      path: "/about",
    },
  ];

  const pathName = usePathname();

  return (
    <div className="flex items-center text-lg ">
      {navList.map((nav) => (
        <Link
          href={nav.path}
          key={nav.path}
          className={`horizontal-underline mr-3 hidden text-xl font-extrabold sm:block md:inline-block ${
            pathName === nav.path ? "horizontal-underline-active" : ""
          }`}
          aria-label={nav.title}
        >
          {nav.title}
        </Link>
      ))}
    </div>
  );
}
