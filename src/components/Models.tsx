import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';

// Sample models data - replace with actual data
const models = [
  {
    id: 1,
    name: 'My Image 1',
    image: 'https://placehold.co/300x400',
  },
  {
    id: 2,
    name: 'My Image 2',
    image: 'https://placehold.co/300x400',
  },
];

export default function Models() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Model</h1>
      <p className="text-gray-600 mb-8">Select a model that best matches your body type for the most accurate virtual try-on experience.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {models.map((model) => (
          <div
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className={`relative cursor-pointer group transition-transform duration-300 ${
              selectedModel === model.id ? 'transform scale-105 ring-4 ring-green-600 shadow-lg' : ''
            }`}
          >
            <div className="relative aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-full object-cover"
              />
              {selectedModel === model.id && (
                <div className="absolute top-2 right-2 bg-green-600 rounded-full p-1">
                  <FiCheck className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-lg font-medium text-gray-900">{model.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 