import { InputText, InputSelect, InputBottom } from './TypeInputs';

export const GeneratePlan = () => {
  return (
    <div className="max-w-4xl">
      <div className="flex w-full gap-3">
        {/* sex */}
        <InputSelect
          label="Sex"
          name="Sex"
          value=""
          className="w-1/2 mb-5"
          onChange={() => {}}
          options={[
            { label: 'Vegetarian', value: 'vegetarian' },
            { label: 'Keto', value: 'keto' },
            { label: 'Mediterranean', value: 'mediterranean' }
          ]}
        />
        {/* age */}
        <InputText
          label="Age"
          value=""
          onChange={() => {}}
          placeholder="20"
          name="Age"
          required={true}
          className="w-1/8"
        />
        {/* weight */}
        <InputText
          label="Weight"
          value=""
          onChange={() => {}}
          placeholder="70 kg"
          name="Weight"
          required={true}
        />
        {/* height */}
        <InputText
          label="Height"
          value=""
          onChange={() => {}}
          placeholder="180 cm"
          name="Height"
          required={true}
        />
      </div>
      <div className="flex w-full gap-3">
        <InputSelect
          label="Objective"
          name="diet"
          value=""
          className="w-1/2 mb-5"
          onChange={() => {}}
          options={[
            { label: 'Vegetarian', value: 'vegetarian' },
            { label: 'Keto', value: 'keto' },
            { label: 'Mediterranean', value: 'mediterranean' }
          ]}
        />

        <InputSelect
          label="Objective"
          name="diet"
          value=""
          className="w-1/2 mb-5"
          onChange={() => {}}
          options={[
            { label: 'Vegetarian', value: 'vegetarian' },
            { label: 'Keto', value: 'keto' },
            { label: 'Mediterranean', value: 'mediterranean' }
          ]}
        />
      </div>
      <div className="flex items-end justify-end w-full">
        <InputBottom
          name="Generate Plan"
          className="px-8 py-3 text-orange-400 bg-orange-100 "
        />
      </div>
    </div>
  );
};
