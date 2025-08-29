import React, { useRef, useState } from 'react'
import appLogo2 from '../assets/app logo2.png';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router-dom';
import LocationSearchPanel from '../Components/LocationSearchPanel';
import VehiclePanel from '../Components/VehiclePanel';
import ConfirmRide from '../Components/ConfirmRide';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForDriver from '../Components/WaitingForDriver';

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false);
  const panelCloseRef = useRef(null)
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)  
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const submitHandler = (e) => {
    e.preventDefault();
  };

  // Animate location panel
  useGSAP(function() {
    gsap.to(panelRef.current, { 
      height: panelOpen ? '100%' : '0%', 
      padding: panelOpen ? 24 : 0,
      duration: 0.25,  // faster transition
      ease: "power2.out"
    });
    gsap.to(panelCloseRef.current, { 
      rotate: panelOpen ? 180 : 0, 
      opacity: panelOpen ? 1 : 0,
      duration: 0.25
    });
  }, [panelOpen]);

  // Animate vehicle panel
  useGSAP(function(){
    gsap.to(vehiclePanelRef.current,{ 
      transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
      ease: "power2.out"
    });
  },[vehiclePanel])

  useGSAP(function(){
    gsap.to(confirmRidePanelRef.current,{ 
      transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
      ease: "power2.out"
    });
  },[confirmRidePanel])

  useGSAP(function(){
    gsap.to(vehicleFoundRef.current,{ 
      transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
      ease: "power2.out"
    });
  },[vehicleFound]) 

  useGSAP(function(){
    gsap.to(waitingForDriverRef.current,{ 
      transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
      ease: "power2.out"
    });
  },[waitingForDriver])   

  return (
    <div className='h-screen relative overflow-hidden'>
      
      {/* Logo + Logout (hidden when search panel is open) */}
      {!panelOpen && (
        <div className='fixed top-0 left-0 w-full p-3 flex items-center justify-between z-10'>
          <img src={appLogo2} alt='Safar Logo' className='w-24' />

          {/* Logout icon */}
          <Link
            to='/login'
            className='h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 bg-white'
          >
            <i className='text-lg ri-logout-box-r-line'></i>
          </Link>
        </div>
      )}

      {/* background image */}
      <img
        className='h-full w-full object-cover'
        src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        alt=""
      />

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
          <h5 
            ref={panelCloseRef}
            onClick={()=> setPanelOpen(false)}
            className='absolute opacity-0 top-6 right-6 text-2xl'
          >
            <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold mb-2'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[42%] left-10 bg-gray-700 rounded-full"></div>

            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-2'
              type="text"
              placeholder='Add a pick-up location'
            />

            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-2'
              type="text"
              placeholder='Enter your destination'
            />
          </form>
        </div>

        {/* panel - fullscreen when open */}
        <div ref={panelRef} className='h-0 bg-white transition-all duration-300 overflow-y-auto'>
          <LocationSearchPanel 
            setPanelOpen={setPanelOpen} 
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/* Bottom sliding panels */}
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>   

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div> 

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>                 
    </div>
  )
}

export default Home
