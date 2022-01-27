import styles from '../styles/Home.module.css'
import tw from 'tailwind-styled-components'
import Map from './components/Map'
import Link from 'next/link'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/*
Notes:
This is how you would normally apply css styles to divs; give each div an appropriate className and define it in the /styles/Home.module.css file

    <div className={styles.container}>
        <div className={styles.map}>Map</div>
        <div className={styles.menu}>Menu</div>
    </div>
*/

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
    }, [])

    return (
        <Wrapper>
                <ActionItems>
                    <Header>
                        <UberLogo src='https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg' />
                        <Profile>
                            <Name>{user && user.name}</Name>
                            <UserImage src={user && user.photoURL} onClick={() => signOut(auth)}/>
                        </Profile>
                    </Header>

                    <Link href='/search'>
                        <InputButton>Where to?</InputButton>
                    </Link>

                    <ActionButtons>
                        <Link href='/search'>
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

                <MapContainer>
                    Around you
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
mr-4 w-24 text-sm
`
const UserImage = tw.img`
h-12 w-12 rounded-full border border-gray-200 p-px cursor-pointer
`
const ActionButtons = tw.div`
flex space-x-4
`
const Button = tw.div`
flex bg-gray-200 flex-1 m-1 h-32 flex-col items-center justify-center rounded-lg transform hover:scale-105 transition text-l cursor-pointer
`
const ButtonImage = tw.img`
h-3/5
`
const InputButton = tw.div`
flex h-10 bg-gray-200 text-xl p-8 items-center my-4 rounded-2
`
const MapContainer = tw.div`
flex-1 p-4 text-xl flex-col items-center
`