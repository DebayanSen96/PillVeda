import React from 'react'
import IMG from './images/Vector.svg'
import LOGO from './images/logo.png'
import './Final_Component.css'
import { AppContext } from '../App'
import { useContext,useRef,useState,useEffect } from 'react'
import Confetti from "react-confetti";

function Final_Component() {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const confetiRef = useRef(null);
  useEffect(() => {
    setHeight(confetiRef.current.clientHeight);
    setWidth(confetiRef.current.clientWidth);
  }, []);


    const data = useContext(AppContext);
    const onCLickHandler = () => {
        console.log(data.user);
    }
  return (
    <div className='store_div final_div' ref={confetiRef}>
      { <Confetti numberOfPieces={30} width={width} height={height} tweenDuration={1000} className='confetti'/> }
        <img className='logo'src={LOGO}/>
        <img className='animate'src={IMG}/>
        <div className='final_text'>
        <h2 className='final_text_large'>Store Created Succesfuly</h2>
        <h6 className='final_text_small'>We will let you know once we verify you documents</h6>
        </div>
        <button onClick={onCLickHandler} className='btn1 btn_file'>Continue</button>
    </div>
  )
}

export default Final_Component