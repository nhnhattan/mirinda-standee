type Step5Props = {
  setState: () => void;
  setReset: () => void
};

const Step5 = ({ setState, setReset }: Step5Props) => {
  return (
    <>
      <div className="flex flex-col gap-3 items-center">
        <img src="/bg/step3Context.png" alt="" className="w-3/5" />
        <div className=" w-4/5  gap-1 flex flex-col items-center justify-center relative oveflow-hidden">
          <img src="/bg/final.png" alt="" className="w-full" />
        </div>
        <div className="w-4/5 flex items-center justify-around gap-4 py-2">
          <button className="w-1/2 flex items-center justify-center relative cursor-pointer hover:scale-110 hover:opacity-80 transition-all">
            <img src="/bg/downloadBtn.png" alt="" className="w-full" />
          </button>
          <button onClick={setReset} className="w-1/2 flex items-center justify-center relative cursor-pointer hover:scale-110 hover:opacity-80 transition-all">
            <img src="/bg/remake.png" alt="" className="w-full" />
          </button>
        </div>
        <button
          onClick={setState}
          className="w-1/2 flex items-center justify-center relative cursor-pointer hover:scale-110 hover:opacity-80 transition-all"
        >
          <img src="/bg/confirmPrint.png" alt="" className="w-full" />
        </button>
        <div className="hidden relative w-full flex items-end justify-between gap-3 px-4">
          <button className="w-1/6 flex flex-col items-center justify-center cursor-pointer hover:scale-110">
            <img src="/bg/backBtn.png" alt="" className="w-4/5" />
            <p className="text-white text-[.6rem] text-nowrap pl-2 pt-1">
              VỀ TRANG TRƯỚC
            </p>
          </button>
          <button className="w-1/6 flex flex-col items-center justify-center cursor-pointer hover:scale-110">
            <img src="/bg/nextBtn.png" alt="" className="w-4/5" />
            <p className="text-white text-[.6rem] text-nowrap pt-1">
              TIẾP THEO
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Step5;
