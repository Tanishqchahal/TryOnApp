import { useState, useEffect } from 'react';
import { FiCheck, FiPlus } from 'react-icons/fi';

// Sample models data - replace with actual data
const models = [
  {
    id: 1,
    name: 'Male Model',
    image: 'https://media.istockphoto.com/id/521071031/photo/full-length-portrait-of-a-cool-black-guy-smiling.jpg?s=612x612&w=0&k=20&c=uKhrupXqSzGyZM8LTU-QBIBdWy67P4Rja5qobqsCuas= ',
  },
  {
    id: 2,
    name: 'Female Model',
    image: 'https://as1.ftcdn.net/jpg/01/29/32/90/1000_F_129329075_UC10cJaFhL6w3NiKDZYNAE4KUlRKeDDz.jpg ',
  },
  {
    id: 3,
    name: 'My Friend',
    image: 'https://i.postimg.cc/D0wN9m48/model.jpg',
  },
];

export default function Models() {
  const [selectedModel, setSelectedModel] = useState<number | null>(() => {
    const saved = localStorage.getItem('selectedModel');
    return saved ? Number(saved) : null;
  });

  useEffect(() => {
    if (selectedModel) {
      localStorage.setItem('selectedModel', selectedModel.toString());
    } else {
      localStorage.removeItem('selectedModel');
    }
  }, [selectedModel]);

  const handleModelSelect = (modelId: number) => {
    setSelectedModel(selectedModel === modelId ? null : modelId);
  };

  const handleAddModel = () => {
    // Add model logic here
    console.log('Add model clicked');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Model</h1>
      <p className="text-gray-600 mb-8">Select a model that best matches your body type for the most accurate virtual try-on experience.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {models.map((model) => (
          <div
            key={model.id}
            onClick={() => handleModelSelect(model.id)}
            className="group cursor-pointer"
          >
            <div className={`relative rounded-lg overflow-hidden bg-gray-100 ${
              selectedModel === model.id ? 'ring-4 ring-green-600' : ''
            }`}>
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-full object-cover aspect-[3/4]"
              />
              {selectedModel === model.id && (
                <div className="absolute top-2 right-2 bg-green-600 rounded-full p-1">
                  <FiCheck className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">{model.name}</h3>
            </div>
          </div>
        ))}

        {/* Add Model Card */}
        <div onClick={handleAddModel} className="cursor-pointer">
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 aspect-[3/4] flex flex-col items-center justify-center">
            <FiPlus className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
} 