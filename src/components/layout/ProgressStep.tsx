
interface ProgressStepProps {
  step: number
  currentStep: number
  isLastStep?: boolean
}

export default function ProgressStep({ step, currentStep, isLastStep }: ProgressStepProps) {
  return (
    <div className={`flex flex-row items-center`}>
      <div className={`w-12 h-12 flex items-center justify-center border-2 rounded-full ${(currentStep > step) ? 'bg-green-500 border-green-500' : (step === currentStep) ? 'bg-blue-500 border-blue-500' : 'bg-white/10 border-white/30'}`}>
        
      </div>
      { !isLastStep && <div className={`w-[8vw] border-[1px] ${(currentStep > step) ? 'border-green-500' :  'border-white'}`}/> }
    </div>
  )
}