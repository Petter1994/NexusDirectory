import {User} from "@/types/user";
import Image from "next/image";
import Link from "next/link";

export default function DirectoryCard({user}: { user: User }) {
    const {email, cargo, firstName, fullName, secondName, userName, profileUrl, area} = user;
    return (
        <>
            <div
                className="group shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark relative overflow-hidden rounded-xl bg-white duration-300">

                <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
                    <div className="flex items-center">
                        <div
                            className="border-body-color/10 mr-5 flex items-center border-r pr-5 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5 dark:border-white/10">
                              <span
                                  className="bg-primary absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white capitalize">
            Nuevo
          </span>
                            <div className="mr-4">
                                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                                    <Image src={profileUrl} alt="author" fill/>
                                </div>
                            </div>
                            <div className="w-full">
                                <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                                    {fullName}
                                </h4>
                                <p className="text-body-color text-xs"><span className='font-bold'>Usuario:</span>{` ${userName}`}</p>
                                <p className="text-body-color text-xs"><span className='font-bold'>Email:</span>{` ${email}`}</p>
                                <p className="text-body-color text-xs"><span className='font-bold'>Area:</span>{` ${area}`}</p>
                                <p className="text-body-color text-xs"><span className='font-bold'>Cargo:</span>{` ${cargo}`}</p>
                            </div>
                        </div>
                        {/*<div className="inline-block">*/}
                        {/*    <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">*/}
                        {/*        Date*/}
                        {/*    </h4>*/}
                        {/*    <p className="text-body-color text-xs">{area}</p>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    );
};
