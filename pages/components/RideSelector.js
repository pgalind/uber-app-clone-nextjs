import { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import { carList } from '../../data/carList'

const RideSelector = ({pickupCoordinates, dropoffCoordinates}) => {
 
    const [ rideDuration, setRideDuration ] = useState(0)

    // template literal uses tickmarks `` and allows you to append the values of variables enclosed in ${}
    useEffect(() => {
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoicGdhbGluZCIsImEiOiJja3g4ZWsyeWUwNHhsMnVvY3pzeXEzc3hoIn0.VH-n-FQUxtfnrNmJ-nOSiw`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setRideDuration(data.routes[0].duration / 60) // divide by 60 to get minutes
        })
        .catch(err => {
            console.error("caught error")
        })
    }, [pickupCoordinates, dropoffCoordinates])
    /*  Note:
        you need to include these dependencies so that if pickupCoordinates or dropoffCoordinates ever change,
        this page will refresh and reflect the updated version.
    */

    return (
        <Wrapper>
            <Title>Choose a ride, or swipe up for more</Title>
            <CarList>
                { carList.map((car, index) => (
                    <Car key={index}>
                        <CarImage src={car.imgUrl} />
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>5 min away</Time>
                        </CarDetails>
                        <Price>{'$' + (rideDuration * car.multiplier).toFixed(2)}</Price>
                    </Car>
                )) }      
            </CarList>
        </Wrapper>
    )
}

export default RideSelector

const Wrapper = tw.div`
flex flex-col flex-1 overflow-y-auto border-b-2
`
const Title = tw.div`
text-grey-500 text-center text-xs py-2 border-b-2
`
const CarList = tw.div`
overflow-y-auto
`
const Car = tw.div`
flex px-4 py-2 items-center hover:bg-slate-50 active:bg-slate-100
`
const CarImage = tw.img`
h-14 mr-4
`
const CarDetails = tw.div`
flex-1
`
// font-medium is not size but weight
const Service = tw.div`
font-medium
`
const Time = tw.div`
text-xs text-blue-500
`
const Price = tw.div`
font-medium
`