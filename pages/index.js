import tw from 'tailwind-styled-components'
import Map from './components/Map'
import Link from 'next/link'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// using tailwind css
export default function Home() {

    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            if(user){
                setUser({
                    name: user.displayName,
                    photoUrl: user.photoURL
                })
            } else {
                setUser(null)
                router.push('/login')
            }
        })
    }, [router])

    return (
        <Wrapper>
                <ActionItems>
                    <Header>
                        <UberLogo src='https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg' />
                        <Profile>
                            <Name>{user && user.name}</Name>
                            <UserImage src={user && user.photoUrl} onClick={() => signOut(auth)}/>
                        </Profile>
                    </Header>

                    <Link href='/search' passHref>
                        <InputButton>Where to?</InputButton>
                    </Link>

                    <ActionButtons>
                        <Link href='/search' passHref>
                            <Button>
                                <ButtonImage src='https://i.ibb.co/cyvcpfF/uberx.png' />
                                Ride
                            </Button>
                        </Link>

                        <Button>
                            <ButtonImage src='https://i.ibb.co/n776JLm/bike.png' />
                            2-Wheels
                        </Button>
                    
                        <Button>
                            <ButtonImage src='https://i.ibb.co/5RjchBg/uberschedule.png' />
                            Reserve
                        </Button>
                    </ActionButtons>

                </ActionItems>

                <MapTitle>Around you</MapTitle>

                <MapContainer>
                    <Map />
                </MapContainer>
        </Wrapper>
    )
}

/* Tailwind div declarations */
const Wrapper = tw.div`
flex flex-col h-screen
`
const ActionItems = tw.div`
flex-1 p-4
`
const Header = tw.div`
flex justify-between items-center
`
const UberLogo = tw.img`
h-24
`
const Profile = tw.div`
flex items-center
`
const Name = tw.div`
mr-4 w-32 text-base justify-left
`
const UserImage = tw.img`
h-12 w-12 rounded-full border border-gray-200 p-px cursor-pointer
`
const ActionButtons = tw.div`
flex space-x-4
`
const Button = tw.div`
flex bg-gray-200 flex-1 h-32 flex-col items-center justify-center rounded-lg text-l font-medium transform hover:scale-105 transition cursor-pointer
`
const ButtonImage = tw.img`
h-3/5
`
const InputButton = tw.div`
flex h-10 bg-gray-200 text-xl py-8 px-4 items-center my-4 rounded-2
`
const MapTitle = tw.div`
text-l text-gray-600 font-medium px-4 pt-4
`
const MapContainer = tw.div`
flex-1 p-4
`