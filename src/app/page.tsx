import Links from "@/components/Links/Links";
import ScrollUp from "@/components/Common/ScrollUp";
import FetchDirectory from "@/components/Directory/FetchDirectory";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "DirTravel",
    description: "DirTravel",
};

export default function Home() {
    return (
        <>
            <ScrollUp/>
            <div className='mt-10'>
                <FetchDirectory/>
            </div>
            <Links/>
        </>
    );
}
