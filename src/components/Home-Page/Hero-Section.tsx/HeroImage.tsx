type HeroImageProps = {
  slide: {
    id: number;
    title: string;
    mainImgSRC: string;
  };
};

export default function HeroImage({ slide }: HeroImageProps) {
  return (
    <div className="md:w-full max-h-fit flex items-center justify-center overflow-hidden">
      <img
        src={slide.mainImgSRC}
        alt={slide.title}
        className="object-contain w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 transition-all duration-700"
      />
    </div>
  );
}
