import { InputText, InputSelect, InputBottom } from './TypeInputs';
import { useState } from 'react';

export const GeneratePlan = () => {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    weight: '',
    height: '',
    objective: '',
    diet: ''
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    // Aquí puedes hacer un fetch o pasar el formData al siguiente paso
  };

  return (
    <div className="max-w-4xl">
      <div className="flex w-full gap-3">
        {/* gender */}
        <InputSelect
          label="Gender"
          name="gender"
          value={formData.gender}
          className="w-1/2 mb-5"
          onChange={(e) => handleChange('gender', e.target.value)}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' }
          ]}
        />
        {/* age */}
        <InputText
          label="Age"
          type="number"
          value={formData.age}
          onChange={(e) => handleChange('age', e.target.value)}
          placeholder="20"
          name="Age"
          required={true}
          className="w-1/8"
        />
        {/* weight */}
        <InputText
          label="Weight"
          type="number"
          value={formData.weight}
          onChange={(e) => handleChange('weight', e.target.value)}
          placeholder="70 kg"
          name="Weight"
          required={true}
        />
        {/* height */}
        <InputText
          label="Height"
          type="number"
          value={formData.height}
          onChange={(e) => handleChange('height', e.target.value)}
          placeholder="180 cm"
          name="Height"
          required={true}
        />
      </div>
      <div className="flex w-full gap-3">
        <InputSelect
          label="Objective"
          name="objective"
          value={formData.objective}
          className="w-1/2 mb-5"
          onChange={(e) => handleChange('objective', e.target.value)}
          options={[
            { label: 'Lose weight', value: 'lose' },
            { label: 'Maintain weight', value: 'maintain' },
            { label: 'Gain weight', value: 'gain' }
          ]}
        />

        <InputSelect
          label="Type of Diet"
          name="diet"
          value={formData.diet}
          className="w-1/2 mb-5"
          onChange={(e) => handleChange('diet', e.target.value)}
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
          className="px-5 py-2 mb-8 text-lg text-black bg-orange-200 border"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
