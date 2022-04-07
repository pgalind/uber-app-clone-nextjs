import { useState } from 'react'
import tw from 'tailwind-styled-components'
import Link from 'next/link'

const Search = () => {

    // store the user input for the pickup and dropoff locations using 'useState()'
    const [ pickup, setPickup ] = useState("")
    const [ dropoff, setDropoff ] = useState("")

    return (
        <Wrapper>
            <ButtonContainer>
                <Link href='/' passHref>
                    <BackButton src='https://img.icons8.com/ios-filled/50/000000/left.png' />
                </Link>
            </ButtonContainer>

            <InputContainer>
                <FromToIcons>
                    <Circle src='https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png' />
                    <Line src='https://img.icons8.com/ios/50/9CA3AF/vertical-line.png' />
                    <Square src='https://img.icons8.com/windows/50/000000/square-full.png' />
                </FromToIcons>
                <InputBoxes>
                    <Input 
                        placeholder="Enter pickup location"
                        value={pickup}
                        onChange={(e) => { setPickup(e.target.value) }}
                    />
                    <Input 
                        placeholder="Where to?"
                        value={dropoff}
                        onChange={(e) => { setDropoff(e.target.value) }}
                    />
                </InputBoxes>
                <PlusIcon src='https://img.icons8.com/ios/50/000000/plus-math.png' />
            </InputContainer>

            <SavedPlaces>
                <StarIcon src='https://img.icons8.com/ios-filled/50/ffffff/star--v1.png' />
                Saved Places
            </SavedPlaces>

            <Link href={{
                pathname: '/confirm',
                query: {
                    pickup: pickup,
                    dropoff: dropoff
                    }
                }} passHref>
                <ConfirmButton>
                    Confirm Locations
                </ConfirmButton>
            </Link>
        </Wrapper>
    )
}

export default Search


/* --- Flex Cheatsheet ---
p - padding added inside the container
m - margin added on all sides of element (other variations: ml, mr, mt, mb, mx, my)
outline-none border-none - gets rid of the blue outline when you click on an input button
items-center - align items along the center of the container's cross axis (prevents flex stretching)
justify-center - align items along the center of the container's main axis
flex-col - position flex items vertically
rounded-full
*/

const Wrapper = tw.div`
bg-gray-200 h-screen
`
const ButtonContainer = tw.div`
bg-white top-4 left-4
`
const BackButton = tw.img`
h-10 hover:bg-slate-50 active:bg-slate-100 rounded-full cursor-pointer
`
const InputContainer = tw.div`
bg-white flex items-center px-4 mb-2
`
const FromToIcons = tw.div`
w-10 flex flex-col mr-2 items-center
`
const Circle = tw.img`
h-2.5
`
const Line = tw.img`
h-10
`
const Square = tw.img`
h-3
`
const InputBoxes = tw.div`
flex flex-col flex-1 mb-2
`
const Input = tw.input`
h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none
`
const PlusIcon = tw.img`
w-10 h-10 bg-gray-200 rounded-full ml-3 active:scale-95 cursor-pointer
`
const SavedPlaces = tw.div`
flex items-center bg-white px-4 py-2
`
const StarIcon = tw.img`
bg-amber-300 w-10 h-10 p-2 rounded-full mr-2
`
const ConfirmButton = tw.div`
h-10 bg-black my-4 mx-24 text-white text-lg font-medium flex items-center justify-center rounded-lg active:scale-95 cursor-pointer
`