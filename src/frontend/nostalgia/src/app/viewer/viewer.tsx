import { ImageCardStack } from "@/components/viewer/image-card-stack";

export const Viewer = () => {
  const images = [
    {
      image:
        "https://images.pexels.com/photos/3351448/pexels-photo-3351448.jpeg",
      caption: "And made a few friends along the way.",
      altText: "a group of soldiers smiling",
    },
    {
      image: "https://images.pexels.com/photos/89112/pexels-photo-89112.jpeg",
      caption: "He also sat on tanks once in a while. Said he liked them :)",
      altText: "a man sitting on a tank",
    },
    {
      image:
        "https://images.pexels.com/photos/3706572/pexels-photo-3706572.jpeg",
      caption:
        "Grandpa once served as a sniper in the army. He could hit a target from 500 meters away.",
      altText: "A man with a rifle looking through the scope",
    },
  ];

  return (
    <div>
      <ImageCardStack images={images} maxImages={5} spreadDistance={2} />
    </div>
  );
};
