'use client'
import Link from "next/link"
import {Image} from "@heroui/react";

import LoginForm from '@/components/Auth/Login/form/LoginForm'
// import DarkModeSwitcher from '@/components/Dashboard/Layout/NavBar/DarkModeSwitcher'

export default function LoginPageContent() {
    return (
        <>
            <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">

                <div className="flex flex-wrap items-center">

                    <div className=" hidden w-full xl:block xl:w-1/2 ">
                        <div className="w-full p-4 sm:p-12.5 xl:p-15 mx-auto justify-center text-center">
                            <Image
                                isBlurred
                                className=""
                                src={"/img/aba.jpg"}
                                alt="Logo"

                            />
                        </div>
                    </div>
                    <div className=" w-full p-7.5  xl:w-1/2">
                        <div
                            className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">

                            <div className='flex justify-between'>

                                <Link className="mb-10 inline-block" href="/">
                                    <Image
                                        className="hidden dark:block"
                                        src={"/images/logo/logo-v2.png"}
                                        alt="Logo"
                                        width={176}
                                        height={100}
                                    />
                                    <Image
                                        className="dark:hidden"
                                        src={"/images/logo/logo-v2.png"}
                                        alt="Logo"
                                        width={176}
                                        height={100}
                                    />
                                </Link>
                                {/*<DarkModeSwitcher/>*/}
                            </div>
                            <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                                Sign in to your account
                            </p>

                            <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                                Welcome Back!
                            </h1>

                            <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                                Please sign in to your account by completing the necessary
                                fields below
                            </p>

                            <div className='mt-5'>
                                <LoginForm/>
                            </div>

                            <div className="mt-31">
                                <Image
                                    src={"/images/grids/grid-02.svg"}
                                    alt="Logo"
                                    width={405}
                                    height={325}
                                    className="mx-auto dark:opacity-30"
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}