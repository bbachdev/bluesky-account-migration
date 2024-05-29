import { HiUserAdd } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { PiUserListFill } from "react-icons/pi";
import { FaGlobe } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";

const COLOR_FUTURE = '#fff'
const COLOR_CURRENT = '#1185fe'
const COLOR_COMPLETED = '#4DE683'

interface ProgressProps {
  step: number
}

export default function Progress( {step }: ProgressProps ) {
  return (
    <div className={`flex flex-row space-x-4 items-center`}>
      <div className={`w-20 h-20 flex items-center justify-center border-2 border-white rounded-full`}>
        {step > 1 && <FaCheck color={COLOR_COMPLETED} size={48}/> || <HiUserAdd color={'white'} size={45}/>}
      </div>
      <GoArrowRight color='white' size={40}/>
      <div className={`w-20 h-20 flex items-center justify-center border-2 border-white rounded-full `}>
        {step > 2 && <FaCheck color={COLOR_COMPLETED} size={48}/> || <FaDatabase color={(step === 2) ? COLOR_FUTURE :COLOR_CURRENT} size={40}/>}
      </div>
      <GoArrowRight color='white' size={40}/>
      <div className={`w-20 h-20 flex items-center justify-center border-2 border-white rounded-full`}>
        {step > 3 && <FaCheck color={COLOR_COMPLETED} size={48}/> || <PiUserListFill color={(step === 1) ? COLOR_FUTURE :COLOR_CURRENT} size={40}/>}
      </div>
      <GoArrowRight color='white' size={40}/>
      <div className={`w-20 h-20 flex items-center justify-center border-2 border-white rounded-full`}>
        {step > 4 && <FaCheck color={COLOR_COMPLETED} size={48}/> || <FaGlobe color={(step === 1) ? COLOR_FUTURE :COLOR_CURRENT} size={40}/>}
      </div>
      <GoArrowRight color='white' size={40}/>
      <div className={`w-20 h-20 flex items-center justify-center border-2 border-white rounded-full`}>
        {step > 5 && <FaCheck color={COLOR_COMPLETED} size={48}/> || <FaFlagCheckered color={(step === 1) ? COLOR_FUTURE :COLOR_CURRENT} size={40}/>}
      </div>
    </div>
  )
}
