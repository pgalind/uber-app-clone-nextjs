import { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import Map from './components/Map'
import RideSelector from './components/RideSelector'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Confirm = () => {

    // catch the pickup and dropoff locations from the search query
    const router = useRouter()
    const { pickup, dropoff } = router.query

    // store the coordinates for the pickup and dropoff locations using 'useState()'
    const [ pickupCoordinates, setPickupCoordinates ] = useState([0, 0])
    const [ dropoffCoordinates, setDropoffCoordinates ] = useState([0, 0])

    // forward geocoding request to convert input into coordinates
    const getPickupCoordinates = (pickup) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` + 
            new URLSearchParams({
                access_token: 'pk.eyJ1IjoicGdhbGluZCIsImEiOiJja3g4ZWsyeWUwNHhsMnVvY3pzeXEzc3hoIn0.VH-n-FQUxtfnrNmJ-nOSiw',
                limit: 1 // only output data for the given location; limits output array size to 1
            })
        )
        .then(res => res.json())
        .then(data => {
            // display the coordinates from the data array
            setPickupCoordinates(data.features[0].center)
        })
    }

    const getDropoffCoordinates = (dropoff) => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` + 
            new URLSearchParams({
                access_token: 'pk.eyJ1IjoicGdhbGluZCIsImEiOiJja3g4ZWsyeWUwNHhsMnVvY3pzeXEzc3hoIn0.VH-n-FQUxtfnrNmJ-nOSiw',
                limit: 1
            })
        )
        .then(res => res.json())
        .then(data => {
            setDropoffCoordinates(data.features[0].center)
        })
    }

    useEffect(() => {
        getPickupCoordinates(pickup);
        getDropoffCoordinates(dropoff);
    }, [pickup, dropoff])

    return (
        <Wrapper>
            <ButtonContainer>
                <Link href='/search'>
                    <BackButton src='https://img.icons8.com/ios-filled/50/000000/left.png' />
                </Link>
            </ButtonContainer>

            <Map
                // pass the coordinate variables as props
                pickupCoordinates = {pickupCoordinates}
                dropoffCoordinates = {dropoffCoordinates}
            />

            <RideContainer>
                <RideSelector
                    // pass the coordinate variables as props
                    pickupCoordinates = {pickupCoordinates}
                    dropoffCoordinates = {dropoffCoordinates}
                />
                <ConfirmButtonContainer>
                    Confirm UberX
                </ConfirmButtonContainer>
            </RideContainer>
        </Wrapper>
    )
}

export default Confirm

const Wrapper = tw.div`
flex flex-col h-screen
`
const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white shadow-md active:bg-slate-100 cursor-pointer
`
const BackButton = tw.img`
h-10 object-contain
`
const RideContainer = tw.div`
flex flex-col flex-1 h-1/2 
`
const ConfirmButtonContainer = tw.div`
h-10 bg-black my-4 mx-24 text-white text-lg flex items-center justify-center rounded-lg active:scale-95 cursor-pointer
`