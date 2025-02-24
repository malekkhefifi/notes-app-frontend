import React, { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({userInfo,onSearchNote}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleSearch = () => {
        // Trigger the search when clicking the search icon
        onSearchNote(searchQuery);
      };

    const onClearSearch = () => {
        // Clear the search query and reset the search result
        setSearchQuery('');
        onSearchNote(''); // You may want to clear the results as well
      };

    return (
        <div className="bg-white flex justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">Notes</h2>

            <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />

            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
    );
};

export default Navbar;
