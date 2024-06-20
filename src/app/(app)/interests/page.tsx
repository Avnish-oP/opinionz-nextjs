"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams, useRouter } from "next/navigation";
interface Interest {
  id: number;
  name: string;
  image: string;
}

const interestsData: Interest[] = [
  {
    id: 1,
    name: "Technology",
    image: "https://source.unsplash.com/featured/?technology",
  },
  {
    id: 2,
    name: "Music",
    image: "https://source.unsplash.com/featured/?music",
  },
  {
    id: 3,
    name: "Sports",
    image: "https://source.unsplash.com/featured/?sports",
  },
  {
    id: 4,
    name: "Travel",
    image: "https://source.unsplash.com/featured/?travel",
  },
  { id: 5, name: "Food", image: "https://source.unsplash.com/featured/?food" },
  // Add more interests as needed
];

const Page: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const router = useRouter();
  const params = useSearchParams();
  const username = params.get("username");
  const toggleInterest = (interestName: string) => {
    setSelectedInterests((prevSelected) =>
      prevSelected.includes(interestName)
        ? prevSelected.filter((name) => name !== interestName)
        : [...prevSelected, interestName]
    );
  };

  const proceed = async () => {
    console.log("Selected Interests: ", selectedInterests);
    console.log("Username: ", username);
    try {
      const response = await axios.post("/api/user-interests", {
        username: username,
        interests: selectedInterests,
      });
      if (response.data.success) {
        toast({
          title: "Interests updated",
          description: response.data.message,
        });
        console.log("Interests updated successfully");
        router.push(`/home`);
      } else {
        toast({
          title: "Error",
          description: response.data.message,
        });
        console.log("Error updating interests");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Internal server error",
        variant: "destructive",
      });
      console.error("Error updating interests", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black to-slate-900 text-white">
      <h2 className="text-4xl font-extrabold mb-8 text-center">
        Select Your Interests
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {interestsData.map((interest) => (
          <div
            key={interest.id}
            className={`relative cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 ${
              selectedInterests.includes(interest.name)
                ? "ring-4 ring-blue-500"
                : ""
            }`}
            onClick={() => toggleInterest(interest.name)}
          >
            <img
              src={interest.image}
              alt={interest.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-xl font-bold">{interest.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className={`px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors ${
            selectedInterests.length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={selectedInterests.length === 0}
          onClick={proceed}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Page;
