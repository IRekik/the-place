import React, { ChangeEvent } from 'react';

interface TitleInputProps {
  title: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, onTitleChange }) => {
    return (
        <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
        </label>
        <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onTitleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Title"
        />
        </div>
    );
};

export default TitleInput;