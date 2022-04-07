
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import { useRouter } from 'next/router'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth, provider } from '../firebase'

const Login = () => {

    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user){
                router.push('/') // if user exists, send me to home page
            }
        })
    }, [router])

    return (
        <Wrapper>
            <UberLogo src='https://i.ibb.co/n6LWQM4/Post.png' />
            <Title>Log in to access your account</Title>
            <HeadImage src='https://i.ibb.co/CsV9RYZ/login-image.png' />
            <SignInButton onClick={() => signInWithPopup(auth, provider)}>
                Sign in with Google</SignInButton>
        </Wrapper>
    )
}

export default Login

const Wrapper = tw.div`
flex flex-col h-screen w-screen bg-gray-200 p-8
`
const SignInButton = tw.div`
h-10 bg-black my-8 mx-24 text-white text-lg font-medium flex items-center justify-center rounded-lg active:scale-95 cursor-pointer
`
const UberLogo = tw.img`
h-20 w-auto object-contain self-start
`
const Title = tw.div`
text-5xl pt-4 text-gray-600
`
const HeadImage = tw.img`
object-contain w-full
`