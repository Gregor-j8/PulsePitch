import { StepConfig } from '../../../types';

interface StepSelectorProps {
  steps: StepConfig[];
  activeStep: number;
  onStepChange: (step: number) => void;
  onAddStep: () => void;
}

export const StepSelector = ({
  steps,
  activeStep,
  onStepChange,
  onAddStep,
}: StepSelectorProps) => {
  return (
    <div className="flex items-center gap-3 bg-white border border-neutral-200 rounded-lg px-3 py-2 shadow-sm">
      <span className="text-sm font-medium text-neutral-700">Step:</span>
      <div className="flex gap-1">
        {steps.map((step) => (
          <button
            key={step.stepNumber}
            onClick={() => onStepChange(step.stepNumber)}
            className={`
              px-3 py-1 rounded text-sm font-medium transition-colors
              ${activeStep === step.stepNumber
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }
            `}
          >
            {step.stepNumber}
          </button>
        ))}
        <button
          onClick={onAddStep}
          className="px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 text-sm font-medium"
          title="Add new step"
        >
          +
        </button>
      </div>
      <span className="text-xs text-neutral-500">
        Keyframes added go into Step {activeStep}
      </span>
    </div>
  );
};
