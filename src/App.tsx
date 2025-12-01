import "./App.css";
import { useForm } from "react-hook-form";
import Webcam from "react-webcam";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useCallback, useRef, useState } from "react";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6";

function App() {
  const formSchema = z.object({
    nameCus: z.string().min(1, "Họ tên không được bỏ trống"),
    phoneCus: z
      .string()
      .min(10, "Số điện thoại tối thiểu 10 số")
      .regex(/^(0|\+84)\d{9}$/, "Số điện thoại không hợp lệ"),
    nameStore: z.string().min(1, "Tên cửa hàng không được bỏ trống"),
    codeStore: z.string().min(1, "Mã cửa hàng không được bỏ trống"),
    province: z.string().min(1, "Tỉnh không được bỏ trống"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const webcamRef: any = useRef(null);

  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("");
  const [selected, setSelected] = useState(0);
  const [isPhoto, setIsPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    if (Object.keys(errors).length > 0) {
      return toast.error("Vui lòng nhập đúng thông tin!");
    }

    console.log("Submitted:", data);
    toast.success("Gửi thành công!");
    setStep(2);
    reset()
  };

  const capture = useCallback(() => {
    const video = webcamRef.current?.video;
    const webcamElement = webcamRef.current?.video;

    if (!video || !webcamElement) {
      toast.error("Camera chưa sẵn sàng để chụp.");
      return;
    }

    const rect = webcamElement.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    const canvas = document.createElement("canvas");
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratioVideo = videoWidth / videoHeight;
    const ratioDisplay = displayWidth / displayHeight;

    let drawWidth, drawHeight;

    if (ratioVideo > ratioDisplay) {
      drawHeight = displayHeight;
      drawWidth = displayHeight * ratioVideo;
    } else {
      drawWidth = displayWidth;
      drawHeight = displayWidth / ratioVideo;
    }

    const offsetX = (displayWidth - drawWidth) / 2;
    const offsetY = (displayHeight - drawHeight) / 2;

    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -drawWidth - offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();

    const imageSrc = canvas.toDataURL("image/jpeg", 0.9);
    setIsPhoto(imageSrc);
  }, []);

  const handleCameraReady = () => {
    setLoading(false);
    setCameraError(false);
  };

  const handleCameraError = (error: string | DOMException) => {
    setLoading(false);
    setCameraError(true);

    if (typeof error === "string") {
      console.error("Camera error:", error);
      toast.error("Không thể truy cập camera trong trình duyệt này: " + error);
    } else {
      console.error("Camera error:", error.message);
      toast.error("Không thể truy cập camera trong trình duyệt này: " + error);
    }
  };

  return (
    <>
      <div className="relative w-screen h-screen py-4 overflow-hidden">
        <img
          src={
            step == 1
              ? "/bg/bgHome.png"
              : step == 2
              ? "/bg/bgChoose.png"
              : step == 5 || step == 6
              ? "/bg/BGLast.png"
              : "/bg/BG.png"
          }
          alt=""
          className="absolute top-0 left-0 h-screen w-screen -z-[1]"
        />
        {step == 1 ? (
          <>
            <div className="flex flex-col gap-3 items-center">
              <img src="/bg/headContext.png" alt="" className="w-1/2" />
              <img src="/bg/homeContext.png" alt="" className="w-3/5" />

              <div className="relative w-[75%] flex items-center justify-center py-2">
                <img src="/bg/frame.png" alt="" className="bg-form h-full" />

                <div className="absolute w-[85%] text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <p className="text-white font-bold text-sm mb-2">
                    Hoàn thiện các thông tin sau:
                  </p>

                  <form
                    onSubmit={handleSubmit(onSubmit, () =>
                      toast.error("Vui lòng nhập đủ thông tin!")
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-2 rounded-md bg-linear mb-3">
                      <label
                        htmlFor="nameCus"
                        className="text-[.55rem] text-[#47A044] font-bold w-[40%]"
                      >
                        HỌ VÀ TÊN <br /> CHỦ CỬA HÀNG
                      </label>
                      <input
                        type="text"
                        id="nameCus"
                        {...register("nameCus")}
                        className="bg-transparent w-[60%] text-xs py-1 text-[#F73232] text-center outline-[#e67a30]"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-2 rounded-md bg-linear mb-3">
                      <label
                        htmlFor="phoneCus"
                        className="text-[.55rem] text-[#47A044] font-bold w-[40%]"
                      >
                        SỐ ĐIỆN THOẠI
                      </label>
                      <input
                        type="text"
                        id="phoneCus"
                        {...register("phoneCus")}
                        className="bg-transparent w-[60%] text-xs py-1 text-[#F73232] text-center outline-[#e67a30]"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-2 rounded-md bg-linear mb-3">
                      <label
                        htmlFor="nameStore"
                        className="text-[.55rem] text-[#47A044] font-bold w-[40%]"
                      >
                        TÊN CỬA HÀNG
                      </label>
                      <input
                        type="text"
                        id="nameStore"
                        {...register("nameStore")}
                        className="bg-transparent w-[60%] text-xs py-1 text-[#F73232] text-center outline-[#e67a30]"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-2 rounded-md bg-linear mb-3">
                      <label
                        htmlFor="codeStore"
                        className="text-[.55rem] text-[#47A044] font-bold w-[40%]"
                      >
                        MÃ CỬA HÀNG
                      </label>
                      <input
                        type="text"
                        id="codeStore"
                        {...register("codeStore")}
                        className="bg-transparent w-[60%] text-xs py-1 text-[#F73232] text-center outline-[#e67a30]"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-2 rounded-md bg-linear mb-3">
                      <label
                        htmlFor="province"
                        className="text-[.55rem] text-[#47A044] font-bold w-[40%]"
                      >
                        TỈNH
                      </label>
                      <input
                        type="text"
                        id="province"
                        {...register("province")}
                        className="bg-transparent w-[60%] text-xs py-1 text-[#F73232] text-center outline-[#e67a30]"
                      />
                    </div>

                    <button className="bg-btn px-4 py-1 mx-auto text-white font-bold mt-1 cursor-pointer">
                      Tham gia
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : step == 2 ? (
          <>
            <div className="flex flex-col gap-3 items-center">
              <img src="/bg/headContext.png" alt="" className="w-1/2" />
              <img src="/bg/homeContext.png" alt="" className="w-3/5" />
              <div className="relative w-[60%] flex items-center justify-center gap-3">
                <img
                  src="/bg/male.png"
                  alt=""
                  className="w-1/2 hover:opacity-80 cursor-pointer"
                  onClick={() => {
                    setGender("male");
                    setStep(3);
                  }}
                />
                <img
                  src="/bg/female.png"
                  alt=""
                  className="w-1/2 hover:opacity-80 cursor-pointer"
                  onClick={() => {
                    setGender("female");
                    setStep(3);
                  }}
                />
              </div>
            </div>
          </>
        ) : step == 3 ? (
          <>
            <div className="flex flex-col gap-3 items-center py-4">
              <img src="/bg/step2Context.png" alt="" className="w-3/5" />
              <img
                src={
                  gender == "male" && selected == 0
                    ? "/bg/male1.png"
                    : gender == "male" && selected == 1
                    ? "/bg/male2.png"
                    : gender == "female" && selected == 0
                    ? "/bg/female1.png"
                    : "/bg/female2.png"
                }
                alt=""
                className="w-3/5 py-6"
              />
              <div className="relative w-full flex items-end justify-between gap-3 px-4">
                <button
                  onClick={() => {
                    setGender("");
                    setStep(2);
                    setSelected(0);
                  }}
                  className="w-1/6 flex flex-col items-center justify-center cursor-pointer hover:scale-110"
                >
                  <img src="/bg/backBtn.png" alt="" className="w-4/5" />
                  <p className="text-white text-[.6rem] text-nowrap pl-2 pt-1">
                    VỀ TRANG TRƯỚC
                  </p>
                </button>

                <div className="option-container">
                  {gender == "male" ? (
                    <>
                      <div
                        className={`option-card ${
                          selected === 0 ? "active" : ""
                        }`}
                        onClick={() => setSelected(0)}
                      >
                        <img src="/bg/male1.png" alt="" />
                      </div>

                      <div
                        className={`option-card ${
                          selected === 1 ? "active" : ""
                        }`}
                        onClick={() => setSelected(1)}
                      >
                        <img src="/bg/male2.png" alt="" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`option-card ${
                          selected === 0 ? "active" : ""
                        }`}
                        onClick={() => setSelected(0)}
                      >
                        <img src="/bg/female1.png" alt="" />
                      </div>
                      <div
                        className={`option-card ${
                          selected === 1 ? "active" : ""
                        }`}
                        onClick={() => setSelected(1)}
                      >
                        <img src="/bg/female2.png" alt="" />
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={() => {
                    console.log(gender, selected);
                    setStep(4);
                  }}
                  className="w-1/6 flex flex-col items-center justify-center cursor-pointer hover:scale-110"
                >
                  <img src="/bg/nextBtn.png" alt="" className="w-4/5" />
                  <p className="text-white text-[.6rem] text-nowrap pt-1">
                    TIẾP THEO
                  </p>
                </button>
              </div>
            </div>
          </>
        ) : step == 4 ? (
          <>
            <div className="flex flex-col gap-3 items-center">
              <img src="/bg/step3Context.png" alt="" className="w-3/5" />
              <p className="text-center py-2 px-8 text-xs text-[#F93B00] font-bold">
                Đảm bảo rõ mặt trước ống kính, cận mặt và không đeo mắt kính để
                có chất lượng tốt nhất
              </p>
              {isPhoto ? (
                <div className=" w-4/5 h-[50vh] gap-1 flex flex-col items-center justify-center relative oveflow-hidden">
                  <img src={isPhoto} alt="" />
                </div>
              ) : (
                <div className=" w-4/5 h-[50vh] gap-1 flex flex-col items-center justify-center relative oveflow-hidden">
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <span className="text-[#ff7c78] font-semibold flex items-center justify-center gap-4">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#ff7c78]"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                        Đang tải camera...
                      </span>
                    </div>
                  )}
                  {cameraError && (
                    <div className="text-red-500 font-semibold">
                      Không thể truy cập camera
                    </div>
                  )}
                  <Webcam
                    className={`rounded-md w-full h-full object-cover border-2 border-[#ff7c78] ${
                      loading ? "opacity-0" : "opacity-100"
                    }`}
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                      width: 1920,
                      height: 1080,
                      facingMode: "user",
                    }}
                    onUserMedia={handleCameraReady}
                    onUserMediaError={handleCameraError}
                    mirrored={true}
                  />
                </div>
              )}
              <div className="w-full flex items-center justify-center gap-4">
                {isPhoto ? (
                  <div className="w-4/5 flex items-center justify-evenly gap-4">
                    <button
                      onClick={() => {
                        setLoading(true);
                        setIsPhoto("");
                      }}
                      className="w-1/2 flex items-center justify-center relative cursor-pointer hover:scale-110 hover:opacity-80 transition-all"
                    >
                      <img
                        src="/bg/captureAgainBG.png"
                        alt=""
                        className="w-full"
                      />
                    </button>
                    <button
                      onClick={async () => {
                        if (isPhoto) {
                          console.log(isPhoto);
                          setStep(5);
                        } else {
                          toast.error("Tải ảnh thất bại");
                        }
                      }}
                      className="w-1/2 flex items-center justify-center relative cursor-pointer hover:scale-110 hover:opacity-80 transition-all"
                    >
                      <img src="/bg/continueBG.png" alt="" className="w-full" />
                    </button>
                  </div>
                ) : (
                  <></>
                )}

                {isPhoto ? (
                  <></>
                ) : (
                  <button
                    onClick={capture}
                    className={`w-5/10  flex items-center justify-center relative cursor-pointer hover:scale-110 hover:opacity-80 transition-all ${
                      loading ? "grayscale" : ""
                    }`}
                    disabled={loading}
                  >
                    <img src="/bg/captureBG.png" alt="" className="w-full" />
                  </button>
                )}
              </div>
              <div className="relative w-full flex items-end justify-between gap-3 px-4">
                <button
                  onClick={() => {
                    setGender("");
                    setStep(3);
                    setSelected(0);
                    setLoading(true);
                    setIsPhoto("");
                  }}
                  className="w-1/6 flex flex-col items-center justify-center cursor-pointer hover:scale-110"
                >
                  <img src="/bg/backBtn.png" alt="" className="w-4/5" />
                  <p className="text-white text-[.6rem] text-nowrap pl-2 pt-1">
                    VỀ TRANG TRƯỚC
                  </p>
                </button>
                <button
                  onClick={async () => {
                    if (isPhoto) {
                      console.log(isPhoto);
                      setStep(5);
                    } else {
                      toast.error("Tải ảnh thất bại");
                    }
                  }}
                  className="w-1/6 flex flex-col items-center justify-center cursor-pointer hover:scale-110"
                >
                  <img src="/bg/nextBtn.png" alt="" className="w-4/5" />
                  <p className="text-white text-[.6rem] text-nowrap pt-1">
                    TIẾP THEO
                  </p>
                </button>
              </div>
            </div>
          </>
        ) : step == 5 ? (
          <Step5
            setState={() => {
              setStep(6);
            }}
            setReset={()=>{
              setStep(1)
            }}
          />
        ) : (
          <Step6
            setState={() => {
              setStep(1);
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;
