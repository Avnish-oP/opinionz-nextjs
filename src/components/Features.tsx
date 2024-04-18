import React from "react";
import Image from "next/image";

import img1 from "../../public/assets/img/anonymous-posting.svg";
import img2 from "../../public/assets/img/community-engagement.svg";
import img3 from "../../public/assets/img/moderation-tools.svg";
import img4 from "../../public/assets/img/fact-verification.svg";

import MagicCard from "./MagicCard";

const Features = () => {
  const images = [img1, img2, img3, img4];

  const features = [
    {
      title: "Anonymous posting",
      description: "Post anonymously and express your opinions",
      image: images[0],
    },
    {
      title: "Engagement tools",
      description: "Engage with the community and participate in discussions",
      image: images[1],
    },
    {
      title: "Respectful environment",
      description: "Ensure a respectful environment with moderation tools",
      image: images[2],
    },
    {
      title: "AI-based facts' verification",
      description: "Verify facts using AI algorithms",
      image: images[3],
    },
    // Add more features here
  ];

  return (
    <div className=" md:py-10 py-5  lg:min-h-[100vh] bg-[#030712] flex flex-col justify-center">
      <h2 className="md:text-4xl text-3xl font-bold text-center my-5 md:my-10">Why to choose opinionZ.com?</h2>
      <section className=" w-full flex justify-center">
        <div className=" grid lg:w-[65%] md:w-[80%] w-[80%] lg:mx-20 md:mx-0 gap-3 lg:grid-cols-2  xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 text-lg">
          {features.map((feature, index) => (
            <MagicCard
              key={index}
              title={feature.title}
              icon={feature.image}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
