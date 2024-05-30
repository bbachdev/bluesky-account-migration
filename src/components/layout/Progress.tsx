import { HiUserAdd } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { PiUserListFill } from "react-icons/pi";
import { FaGlobe } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import ProgressStep from './ProgressStep';

const COLOR_FUTURE = '#fff'
const COLOR_CURRENT = '#1185fe'
const COLOR_COMPLETED = '#4DE683'

interface ProgressProps {
  step: number
}

export default function Progress( {step }: ProgressProps ) {
  return (
    <div className={`flex flex-row items-center`}>
      <ProgressStep step={1} currentStep={step}/>
      <ProgressStep step={2} currentStep={step}/>
      <ProgressStep step={3} currentStep={step}/>
      <ProgressStep step={4} currentStep={step}/>
      <ProgressStep step={5} currentStep={step} isLastStep={true}/>
    </div>
  )
}
