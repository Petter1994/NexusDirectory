import {FormEvent, ChangeEvent, useState} from 'react'
import {signIn} from "next-auth/react"
import {useRouter} from 'next/navigation'
import {Button, Input} from "@heroui/react"

import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'


interface FormErrors {
    username?: string,
    password?: string,
}

type FormData = {
    username: string,
    password: string,
}


export default function LoginForm() {
    const router = useRouter()
    const [visiblePass1, setVisiblePass1] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        username:'', password:''
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [isInvalid, setIsInvalid] = useState<boolean>(false)

    let callback = null

    if (typeof window !== "undefined") {
        const href = window.location.search;
        const queryParams = new URLSearchParams(href);
        callback = queryParams.get("callbackUrl");
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validateForm = () => {
        let newErrors: FormErrors = {}

        if (formData.username === "") {
            newErrors.username = 'Please enter a valid username'
        }
        if (formData.password === "") {
            newErrors.password = 'Please enter a valid password'
        }
        if (Object.keys(newErrors).length === 0) {
            return true
        } else {
            setErrors(newErrors)
            return false
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setIsInvalid(false)
        if (validateForm()) {
            const result = await signIn("Credentials", {
                username: formData.username,
                password: formData.password,
                redirect: false,
            });

            if (result?.status !== 200) {
                setIsInvalid(true)
                setIsLoading(false);
            } else {
                await router.push(callback ? callback : "/dashboard")
            }
        } else {
            setIsLoading(false)
        }
    };

    const toggleVisibility1 = () => setVisiblePass1(!visiblePass1);

    const cleanErrors = () => {
        setErrors({})
    }


    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                {
                    isInvalid &&
                    <span className='text-danger mx-auto'>
                    Invalid Credentials
                    </span>
                }
                <div className="flex w-full justify-center">
                    <div className="w-full">
                        <Input
                            isRequired
                            isInvalid={errors.username == "Please enter a valid username"}
                            errorMessage={errors.username}
                            id='username'
                            name='username'
                            type="text"
                            variant='flat'
                            label="Username"
                            placeholder="Enter Your Username"
                            onChange={handleInputChange}
                            onFocus={cleanErrors}
                        />

                        <Input
                            isRequired
                            className='mt-6'
                            isInvalid={errors.password == "Please enter a valid password"}
                            errorMessage={errors.password}
                            id='password'
                            name='password'
                            type={visiblePass1 ? "text" : "password"}
                            variant='flat'
                            label="Password"
                            placeholder="Enter Your Password"
                            onChange={handleInputChange}
                            onFocus={cleanErrors}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility1}>
                                    {visiblePass1 ? (
                                        <VisibilityOutlinedIcon
                                            className="text-2xl text-default-400 pointer-events-none"/>
                                    ) : (
                                        <VisibilityOffOutlinedIcon
                                            className="text-2xl text-default-400 pointer-events-none"/>
                                    )}
                                </button>
                            }
                        />
                    </div>
                </div>

                <div className="mt-6 w-2/4 mx-auto">
                    {
                        isLoading ?
                            <>
                                <Button
                                    isLoading
                                    color='primary'
                                    variant='solid'
                                    className='mt-2 flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke p-4 dark:border-strokedark h-[50px] text-large transition hover:bg-opacity-90'

                                >
                                    Login
                                </Button>
                            </>
                            :
                            <>
                                <Button
                                    type='submit'
                                    startContent={<LoginOutlinedIcon/>}
                                    color='primary'
                                    variant='solid'
                                    className='mt-2 flex w-full items-center justify-center gap-3.5 rounded-lg border  border-primary  border-stroke p-4 dark:border-strokedark h-[50px] text-large transition hover:bg-opacity-90'

                                >
                                    Login
                                </Button>
                            </>
                    }
                </div>
            </form>
        </>
    )
}