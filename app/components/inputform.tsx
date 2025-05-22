// components/InputForm.tsx

import { useState } from 'react';

interface InputFormProps {
  onSubmit: (url: string) => void;
}


const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
    const [url, setUrl] = useState('');
  
    const handleSubmit = () => {
      if (url) {
        onSubmit(url);
      }
    };
  
    return (
      <div className="w-full max-w-md bg-white shadow-md p-6 rounded-md">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL to check"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out cursor-pointer"
        >
          Check Links
        </button>
      </div>
    );
  };
  
  

export default InputForm;
