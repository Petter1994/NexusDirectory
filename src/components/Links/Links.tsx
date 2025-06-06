import { Link } from "@/types/link";
import Image from "next/image";
import linksData from "@/data/linksData";


const SingleLink = ({ link }: { link: Link }) => {
    const { href, image, imageLight, name } = link;

    return (
        <div className="flex w-1/2 items-center justify-center px-3 py-[15px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
            <a
                href={href}
                target="_blank"
                rel="nofollow noreferrer"
                className="relative h-10 w-full opacity-70 transition hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
            >
                <Image src={imageLight} alt={name} fill className="hidden dark:block" />
                <Image src={image} alt={name} fill className="block dark:hidden" />
            </a>
        </div>
    );
};


export default function Links  ()  {
  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center rounded-xs bg-gray-light px-8 py-8 dark:bg-gray-dark sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
              {linksData.map((link) => (
                <SingleLink key={link.id} link={link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




