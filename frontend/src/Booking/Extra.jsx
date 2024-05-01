import React, { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const HoverDropdownMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
        >
            <button
                type="button"
                className="inline-flex justify-center w-full text-sm font-medium text-white bg-gray-700 rounded-md group-hover:bg-red-500 relative"
            >
                Menu
                {/* Drop-down and up arrow icons */}
                {isDropdownOpen ? (
                    <KeyboardArrowUpIcon />
                ) : (
                    <KeyboardArrowDownIcon />
                )}
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 transform  ml-96 sm:px-0">

                    <div className="rounded-md shadow-lg ring-1  overflow-hidden">
                        <div className="relative grid gap-2 bg-white  sm:gap-8 sm:p-8">
                            <a
                                href="/home"
                                className="hover:bg-[#e3d9d9] flex rounded-md pr-4"
                            >
                                <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">
                                        Buy
                                    </p>
                                </div>
                            </a>
                            <a
                                href="/gate"
                                className="hover:bg-[#e3d9d9] flex rounded-md pr-4"
                            >
                                <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">
                                        Sell
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HoverDropdownMenu;
