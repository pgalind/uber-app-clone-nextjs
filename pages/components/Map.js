import { useEffect } from 'react'
import tw from 'tailwind-styled-components'
import mapboxgl from '!mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoicGdhbGluZCIsImEiOiJja3g4ZWsyeWUwNHhsMnVvY3pzeXEzc3hoIn0.VH-n-FQUxtfnrNmJ-nOSiw';

// Components are reusable UI elements
const Map = ({pickupCoordinates, dropoffCoordinates}) => {

    // Initialize the map and add the markers only if the coordinates have been returned from Mapbox
    useEffect(() => {
        const map = new mapboxgl.Map({
                container: 'map', // matches the id of Map div (Wrapper)
                style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
                center: [-99.29011, 39.39172],
                zoom: 3,
        })

        // Add geolocate to display user's location
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true,
                // Show user location by default
                showUserLocation: true
                })
        );

        // add pickup marker
        if(pickupCoordinates){
            addPickupToMap(map, pickupCoordinates)
        }
        // add dropoff marker
        if(dropoffCoordinates){
            addDropoffToMap(map, dropoffCoordinates)
        }
        // do an auto zoom to fit both markers in the screen
        if(pickupCoordinates && dropoffCoordinates){
            map.fitBounds([
                pickupCoordinates,
                dropoffCoordinates
            ], {
                padding: 80
            })
        }

    }, [pickupCoordinates, dropoffCoordinates])

    const addPickupToMap = (map, coordinate) => {
        const pickupMarker = new mapboxgl.Marker()
        .setLngLat(coordinate)
        .addTo(map);
    }

    const addDropoffToMap = (map, coordinate) => {
        const dropoffMarker = new mapboxgl.Marker()
        .setLngLat(coordinate)
        .addTo(map);
    }

    return <Wrapper id='map'></Wrapper>
}

export default Map

const Wrapper = tw.div`
flex h-full
`
