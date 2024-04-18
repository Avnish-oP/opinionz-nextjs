import React from 'react';

type MagicButtonProps = {
    name: string;
};

const MagicButton: React.FC<MagicButtonProps> = ({ name }) => {
    return (
        <button className="relative  inline-flex h-10 overflow-hidden rounded-full p-[1.5px] focus:outline-none focus:ring-1 focus:ring-blue-400 ">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 hover:bg-[#201642e4]  px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                {name}
            </span>
        </button>
    );
};

export default MagicButton;