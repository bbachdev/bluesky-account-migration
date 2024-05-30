import ProgressStep from './ProgressStep';

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
