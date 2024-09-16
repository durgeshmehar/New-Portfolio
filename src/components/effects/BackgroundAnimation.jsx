
export const BackgroundAnimation = ({ top, right, left ,animation}) => {
  return (
    <>
      <div className={`w-1/2 h-64 absolute ${top} ${right} opacity-50 ${animation}  filter blur-[120px]`}>
        <div className="relative">
          <div className="border border-green-600 rounded-full h-60 w-full bg-blue-600"></div>
          <div className="border absolute bottom-24 -left-24 rounded-full h-60 w-full bg-blue-700"></div>
          <div className="absolute top-24 left-24 rounded-full h-60 w-full bg-purple-600"></div>
        </div>
      </div>

      <div className={`w-1/2 h-64 absolute ${top} ${left} opacity-50  ${animation} filter blur-[120px]`}>
        <div className="relative">
          <div className="rounded-full h-60 w-full bg-purple-800"></div>
          <div className="absolute bottom-24 -left-24 rounded-full h-60 w-full bg-red-800"></div>
          <div className="absolute top-24 left-24 rounded-full h-60 w-full bg-purple-600"></div>
        </div>
      </div>
    </>
  );
};
