import React from 'react'

const LocationSearchPanel = (props) => {
  /// sample array for location
  const locations = [
    "24B, Near Kapoor's Cafe, New Delhi",
    "22C, Near Malhotra's Cafe, New Delhi",
    "20B, Near Singhai's Cafe, New Delhi",
    "18A, Near Sharma's Cafe, New Delhi",
  ]

  return (
    <div>
      {locations.map((elem, idx) => {
        return (
          <div 
            key={idx} 
            onClick={() => {
              // close search panel first
              props.setPanelOpen(false)
              // then open vehicle panel smoothly after a short delay
              setTimeout(() => {
                props.setVehiclePanel(true)
              }, 500) // delay matches GSAP animation (~0.25s)
            }} 
            className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer transition-all duration-200 hover:bg-gray-50'
          >
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-10 rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default LocationSearchPanel
