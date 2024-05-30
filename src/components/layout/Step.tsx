import Progress from './Progress'

interface StepProps {
  title: string
  currentStep: number
  children?: React.ReactNode
}

export default function Step({ title, currentStep, children }: StepProps) {
  return (
    <>
      <div id="progress" className={`mx-auto mt-8`}>
        <Progress step={currentStep}/>
      </div>
        <div className={`flex flex-col items-center h-full max-w-[1440px] px-8 mx-auto mt-8`}>
          <h2 className={`text-white/80 text-2xl mr-auto`}>{title}</h2>
          <div className={`border-2 border-white/80 w-full my-4`} />
          <div className={``}>
            {children}
          </div>
      </div>
    </>
  )
}