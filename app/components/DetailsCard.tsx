export const DetailsCard = ({ src, type }: { src: string; type: string }) => {
  return (
    <div className="w-full mx-auto rounded-lg overflow-hidden border border-gray-300">
      {type === "IMAGE" ? (
        <div className="w-full h-auto flex justify-center items-center overflow-hidden">
          <img
            className="w-full h-auto sm:max-h-[300px] md:max-h-[450px] object-contain"
            src={src}
            alt="Meme"
          />
        </div>
      ) : type === "VIDEO" ? (
        <div className="w-full h-auto flex justify-center items-center overflow-hidden">
          <video
            className="w-full h-auto sm:max-h-[300px] md:max-h-[450px] object-contain"
            autoPlay
            controls
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      ) : null}
    </div>
  );
};
