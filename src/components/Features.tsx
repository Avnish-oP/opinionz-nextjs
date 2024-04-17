import React from "react";
import Image from "next/image";
// import img1 from "@/images/anonymous-posting.svg";
import img1 from "../../public/assets/img/anonymous-posting.svg";
import img2 from "../../public/assets/img/community-engagement.svg";
import img3 from "../../public/assets/img/moderation-tools.svg";
import img4 from "../../public/assets/img/fact-verification.svg";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const Features = () => {
  const images = [img1, img2, img3, img4];

  const features = [
    {
      title: "Anonymous posting",
      description: "Post anonymously and express your opinions",
      image: images[0],
    },
    {
      title: "Community engagement tools",
      description: "Engage with the community and participate in discussions",
      image: images[1],
    },
    {
      title: "Moderation tools for a respectful environment",
      description: "Ensure a respectful environment with moderation tools",
      image: images[2],
    },
    {
      title: "AI-based fact's verification",
      description: "Verify facts using AI algorithms",
      image: images[3],
    },
    // Add more features here
  ];

  return (
    <div className="my-10 min-h-[80vh] flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-center">Key Features</h2>
      <section className="py-8 w-full flex justify-center">
        <div className=" grid md:w-full w-[80%] lg:mx-20 md:mx-0 gap-5 lg:grid-cols-4  sm:grid-cols-1 md:grid-cols-2 text-lg">
          {features.map((feature, index) => (
            <div
              className=" border-4 rounded-xl hover:bg-[#171030ea] w-full p-5 hover:-translate-y-[2px] ease-in-out duration-200 hover:scale-[1.01]"
              key={index}
            >
              <div className="h-[60%]">
                <h3 className="font-bold text-2xl">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="flex flex-row justify-center w-full h-[40%]">
                <Image
                  className="w-32"
                  src={feature.image}
                  alt={feature.title}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
