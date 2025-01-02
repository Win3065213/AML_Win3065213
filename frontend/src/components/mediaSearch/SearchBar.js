'use client';

import { useState } from "react";
import RadioButton from "./Elements/RadioButton";
import Checkbox from "./Elements/Checkbox";

//callback input
export default function SearchBar({ onSearch }) {
    const [searchValue, setValue] = useState('');
    const [isAdvanced, setAdvanced] = useState(false);
    const [searchBy, setSearchBy] = useState('all');
    const [mediaTypes, setMediaTypes] = useState({
        all: true,
        book: true,
        periodical: true,
        multimedia: true,
    });
    
    const searchMedia = (e) => {
        e.preventDefault();
        onSearch({
            value: searchValue,
            isAdvanced,
            searchBy,
            mediaTypes,
        })
    }

    const handleMediaTypeChange = (type) => {
        if (type === 'all') {
            const newValue = !mediaTypes.all;
            setMediaTypes({
                all: newValue,
                book: newValue,
                periodical: newValue,
                multimedia: newValue,
            });
        } else {
            setMediaTypes((prev) => {
                const newState = { ...prev, [type]: !prev[type] };
                newState.all = Object.entries(newState)
                    .filter(([key]) => key !== 'all')   // exclude "all"
                    .every(([_, value]) => value);      // check value of remaining ones.
                return newState;
            });
        }
    };

    return (
        <form onSubmit={searchMedia}>
            <div className="flex flex-wrap space-x-2">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={isAdvanced && searchBy != "all" ? `Enter ${searchBy}` :"Enter title, creator, publisher"}
                    className="flex-grow text-black p-3 border-4 border-primary rounded"
                    />
                <button className="w-28 bg-primary p-3 rounded font-bold" type="submit">Search</button>
                <div className="w-full md:w-auto md:ml-auto mt-2 md:mt-0 flex justify-end">
                    <button type="button" onClick={() => setAdvanced(!isAdvanced)} className="w-45 p-3 rounded border-4 border-primary font-bold">
                        {isAdvanced ? 'Simple Search' : 'Advanced Search'}
                    </button>
                </div>
            </div>
            {isAdvanced && (
                <div className="space-y-4 mt-2 p-4 glass dark:bg-gray-800 rounded">
                    <div>
                        <div>Search By:</div>
                        <RadioButton
                            name="category"
                            value={searchBy}
                            onChange={setSearchBy}
                            options={[
                                { value: 'all', label: 'All' },
                                { value: 'mediaName', label: 'Name' },
                                { value: 'creator', label: 'Creator' },
                                { value: 'publisher', label: 'Publisher' },
                            ]}
                        />
                    </div>
                    <div>
                        <label>Media Type:</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {Object.entries(mediaTypes).map(([type, checked]) => (
                            <Checkbox
                                key={type}
                                id={type}
                                checked={checked}
                                onChange={() => handleMediaTypeChange(type)}
                                label={type.charAt(0).toUpperCase() + type.slice(1)}
                            />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </form>
    )
}