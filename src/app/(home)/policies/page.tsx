import { Backward, Forward, Pause } from 'iconsax-react';

/* eslint-disable @next/next/no-img-element */
export default function PoliciesPage() {
  // return <div>Privacy & Policy</div>;
  return (
    <>
      <div className="container mx-auto mb-20 sm:my-5 sm:px-4 min-h-screen">
        <div className="">
          <div className="bg-white rounded-sm shadow-lg">
            <div className="py-5 px-5 bg-slate-100">
              <div className="box">
                <div className="flex">
                  <div className="w-full basis-[10%]">
                    <div className="w-[90px] md:w-[150px] h-[90px] md:h-[150px] rounded-sm overflow-hidden shadow-xl">
                      <img
                        src="https://lh4.googleusercontent.com/1KhTU6BWGm_8lVaVuEWxPcNKS4r0KB_njoaWjtuGMq12IaJ1xn7lSlDR8mdQjjkSoce3S59xAN1Aa96TRzePcHmpc-kJ6MkyuYVJ41OGX5Gj147pyG5uknAEqXAZ-bOTneJeEovUqQmbrqjWfXu8SLk"
                        alt="post_owner_avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full basis-[90%] pl-5">
                    <h3 className="text-base sm:text-xl text-gray-800 font-bold capitalize">
                      Look Around
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 font-normal uppercase mt-1">
                      Native Spirit
                    </p>
                  </div>
                </div>
                <div className="flex mt-3">
                  <div className="w-full basis-[10%]">
                    <div className="w-[90px] md:w-[150px] flex justify-between items-center">
                      <button>
                        <Backward size="21" color="#777" variant="TwoTone" />
                      </button>
                      <button className="bg-accentRed p-2 rounded-full">
                        <Pause size="21" color="#fff" variant="Outline" />
                      </button>
                      <button>
                        <Forward size="21" color="#777" variant="TwoTone" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full basis-[90%] pl-5"></div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="">
                <div className="py-2 first-of-type:pt-4 last-of-type:pb-4 px-5 hover:bg-slate-100 cursor-pointer">
                  <div className="flex items-start">
                    <div className="w-[45px] md:w-[50px] h-auto md:h-[50px] rounded-full overflow-hidden shadow-xl">
                      <img
                        src="https://lh4.googleusercontent.com/1KhTU6BWGm_8lVaVuEWxPcNKS4r0KB_njoaWjtuGMq12IaJ1xn7lSlDR8mdQjjkSoce3S59xAN1Aa96TRzePcHmpc-kJ6MkyuYVJ41OGX5Gj147pyG5uknAEqXAZ-bOTneJeEovUqQmbrqjWfXu8SLk"
                        alt="post_owner_avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full basis-[90%] pl-2">
                      <h3 className="text-sm sm:text-base text-gray-800 font-bold capitalize">
                        Give It All
                      </h3>
                      <p className="text-xs text-gray-700 font-normal uppercase">
                        LUCAS CHAMBON
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2 first-of-type:pt-4 last-of-type:pb-4 px-5 hover:bg-slate-100 cursor-pointer">
                  <div className="flex items-start">
                    <div className="w-[45px] md:w-[50px] h-auto md:h-[50px] rounded-full overflow-hidden shadow-xl">
                      <img
                        src="https://lh4.googleusercontent.com/1KhTU6BWGm_8lVaVuEWxPcNKS4r0KB_njoaWjtuGMq12IaJ1xn7lSlDR8mdQjjkSoce3S59xAN1Aa96TRzePcHmpc-kJ6MkyuYVJ41OGX5Gj147pyG5uknAEqXAZ-bOTneJeEovUqQmbrqjWfXu8SLk"
                        alt="post_owner_avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full basis-[90%] pl-2">
                      <h3 className="text-sm sm:text-base text-gray-800 font-bold capitalize">
                        Give It All
                      </h3>
                      <p className="text-xs text-gray-700 font-normal uppercase">
                        LUCAS CHAMBON
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2 first-of-type:pt-4 last-of-type:pb-4 px-5 hover:bg-slate-100 cursor-pointer">
                  <div className="flex items-start">
                    <div className="w-[45px] md:w-[50px] h-auto md:h-[50px] rounded-full overflow-hidden shadow-xl">
                      <img
                        src="https://lh4.googleusercontent.com/1KhTU6BWGm_8lVaVuEWxPcNKS4r0KB_njoaWjtuGMq12IaJ1xn7lSlDR8mdQjjkSoce3S59xAN1Aa96TRzePcHmpc-kJ6MkyuYVJ41OGX5Gj147pyG5uknAEqXAZ-bOTneJeEovUqQmbrqjWfXu8SLk"
                        alt="post_owner_avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full basis-[90%] pl-2">
                      <h3 className="text-sm sm:text-base text-gray-800 font-bold capitalize">
                        Give It All
                      </h3>
                      <p className="text-xs text-gray-700 font-normal uppercase">
                        LUCAS CHAMBON
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
