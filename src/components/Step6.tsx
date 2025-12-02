import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SignaturePad from "signature_pad";

type Step6Props = {
  setState: () => void;
};

const Step6 = ({ setState }: Step6Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sigPad = useRef<SignaturePad | null>(null);

  const [signatureImg, setSignatureImg] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  // const [typeName, setTypeName] = useState("");

  // Tab: 'typed' = nhập tên, 'hand' = ký tay
  const [activeTab, setActiveTab] = useState<"typed" | "hand">("hand");

  useEffect(() => {
    if (activeTab !== "hand") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ratio = Math.max(window.devicePixelRatio || 1, 2);
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(ratio, ratio);

    sigPad.current = new SignaturePad(canvas, {
      minWidth: 2,
      maxWidth: 2.5,
      penColor: "black",
      throttle: 0,
      minDistance: 0.5,
    });
  }, [activeTab]);

  const clearPad = () => sigPad.current?.clear();

  const saveSignaturePad = () => {
    if (!sigPad.current || sigPad.current.isEmpty()) return;

    const img = sigPad.current.toDataURL("image/png");
    setSignatureImg(img);
  };

  // const normalizeName = (str: string) => {
  //   return str
  //     .normalize("NFD")
  //     .replace(/[\u0300-\u036f]/g, "")
  //     .replace(/đ/g, "d")
  //     .replace(/Đ/g, "d");
  //   //   .toLowerCase();
  // };

  // const generateTypedSignature = () => {
  //   if (!typeName.trim()) return;

  //   const cleanName = normalizeName(typeName);
  //   const canvas = document.createElement("canvas");
  //   canvas.width = 900;
  //   canvas.height = 680;

  //   const ctx = canvas.getContext("2d")!;
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   ctx.font = "140px 'Great Vibes', cursive";
  //   ctx.fillStyle = "#000";
  //   ctx.textBaseline = "middle";

  //   const maxWidth = canvas.width - 80;
  //   const words = cleanName.split(" ");
  //   const lines: string[] = [];
  //   let currentLine = "";

  //   // Wrap chữ
  //   for (const word of words) {
  //     const testLine = currentLine ? currentLine + " " + word : word;
  //     const { width: testWidth } = ctx.measureText(testLine);
  //     if (testWidth > maxWidth) {
  //       if (currentLine) lines.push(currentLine);
  //       currentLine = word;
  //     } else {
  //       currentLine = testLine;
  //     }
  //   }
  //   if (currentLine) lines.push(currentLine);

  //   const lineHeight = 180;
  //   const totalHeight = lines.length * lineHeight;
  //   let startY = (canvas.height - totalHeight) / 2 + lineHeight / 2;

  //   lines.forEach((line) => {
  //     const textWidth = ctx.measureText(line).width;
  //     const x = (canvas.width - textWidth) / 2;
  //     ctx.fillText(line, x, startY);
  //     startY += lineHeight;
  //   });

  //   const img = canvas.toDataURL("image/png");
  //   setSignatureImg(img);
  // };

  return (
    <>
      <div className="flex flex-col gap-3 items-center">
        <img src="/bg/stepPrinpt.png" alt="" className="w-2/5" />

        <div className="w-full h-full rounded-xl p-4 relative  flex flex-col items-center justify-center shadow">
          <img src="/bg/frame.png" alt="" className="bg-form" />

          <div className="absolute w-[75%] text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex w-full">
              <button
                className={`w-full px-4 py-2 rounded-t-xl uppercase text-xl ${
                  activeTab === "hand"
                    ? "bg-[#f3b266] text-white font-bold "
                    : "bg-gray-200 text-gray-400 "
                }`}
                onClick={() => setActiveTab("hand")}
              >
                Ký tên
              </button>
              {/* <button
                className={`w-1/2 px-4 py-2 rounded-tr-xl ${
                  activeTab === "typed"
                    ? "bg-[#f3b266] text-white font-bold border-l-2"
                    : "bg-gray-200 text-gray-400 border-none"
                }`}
                onClick={() => setActiveTab("typed")}
              >
                Nhập tên
              </button> */}
            </div>

            {/* {activeTab === "typed" && (
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Nhập tên của bạn..."
                  value={typeName}
                  onChange={(e) => setTypeName(e.target.value)}
                  className="w-full bg-white text-[#e77b29] font-bold px-4 py-8 outline-0 rounded-b-xl mb-3 shadow-[inset_-1px_3px_9px_0px_#e77b29]"
                />

                <div className="flex justify-center">
                  <button
                    onClick={generateTypedSignature}
                    className="w-1/2 flex items-center justify-center relative cursor-pointer hover:scale-110 hover:opacity-80 transition-all"
                  >
                    <img src="/bg/confirmSig.png" alt="" className="w-full" />
                  </button>
                </div>
              </div>
            )} */}

            {activeTab === "hand" && (
              <div>
                <div className="w-full h-48 rounded-b-lg bg-white shadow-[inset_-1px_3px_9px_0px_#e77b29]">
                  <canvas ref={canvasRef} className="w-full h-full" />
                </div>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={clearPad}
                    className="w-1/2 flex items-center justify-center relative cursor-pointer hover:scale-110 hover:opacity-80 transition-all"
                  >
                    <img src="/bg/sigAgain.png" alt="" className="w-full" />
                  </button>

                  <button
                    onClick={saveSignaturePad}
                    className="w-1/2 flex items-center justify-center relative cursor-pointer hover:scale-110 hover:opacity-80 transition-all"
                  >
                    <img src="/bg/confirmSig.png" alt="" className="w-full" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {signatureImg && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#e77b29] text-white p-5 rounded-xl shadow-xl max-w-xl w-4/5 text-center">
            <h2 className="text-xl font-semibold mb-3">Chữ ký của bạn</h2>

            <img
              src={signatureImg}
              alt="signature"
              className="mx-auto w-full py-8 object-contain"
            />

            <button
              onClick={() => {
                setSignatureImg(null);
                clearPad();
                toast.loading("Đang kiểm tra...");
                setTimeout(() => {
                  toast.dismiss();
                  toast.success("Gửi xác nhận in thành công!");
                  setCompleted(true);
                }, 1000);
              }}
              className="w-3/4 mx-auto flex items-center justify-center relative cursor-pointer hover:scale-110 hover:opacity-80 transition-all"
            >
              <img src="/bg/sendSig.png" alt="" className="w-full" />
            </button>
          </div>
        </div>
      )}

      {completed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#e77b29] text-white p-5 rounded-xl shadow-xl max-w-xl w-4/5 text-center">
            <h2 className="text-xl font-semibold mb-3">Cảm ơn bạn đã tham gia!</h2>

            <button
              onClick={() => {
                setCompleted(false)
              }}
              className="w-[60%] py-2 mx-auto flex items-center justify-center relative cursor-pointer hover:scale-110 hover:opacity-80 transition-all"
            >
              <img src="/bg/bgButton.png" alt="" className="w-full" />
              <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold uppercase text-lg ">Đóng</p>
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full flex items-center justify-center gap-3 px-4">
        <button
          onClick={setState}
          className="w-1/6 flex flex-col items-center justify-center cursor-pointer hover:scale-110"
        >
          <img src="/bg/backBtn.png" alt="" className="w-4/5" />
          <p className="text-white text-[.6rem] text-nowrap pl-2 pt-1">
            VỀ TRANG CHỦ
          </p>
        </button>
      </div>
    </>
  );
};

export default Step6;
