export default function PostLoadingSkeleton() {
  return (
    <>
      <div className="bg-white w-full max-w-3xl animate-pulse">
        <div className="bg-gray-100 px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-slate-300 rounded-full"></div>
            <div>
              <div className="h-5 w-20 bg-slate-300 rounded-sm my-2"></div>
              <div className="h-5 w-48 bg-slate-300 rounded-sm my-2"></div>
            </div>
          </div>
          <div>
            <div className="h-6 w-48 bg-slate-300 rounded-sm my-2"></div>
            <div className="h-20 w-full bg-slate-300 rounded-sm my-2"></div>
          </div>
          <div className="h-16 w-full bg-slate-300 rounded-md my-2"></div>
          <div className="flex items-center gap-4">
            <span className="h-7 w-7 bg-slate-300 rounded-md"></span>
            <span className="h-7 w-7 bg-slate-300 rounded-md"></span>
            <span className="h-7 w-7 bg-slate-300 rounded-md"></span>
          </div>
        </div>
        <div className="px-4 py-4">
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <div className="h-9 w-9 bg-slate-200 rounded-full"></div>
              <div>
                <div className="h-3 w-24 bg-slate-200 rounded-sm my-2"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-9 w-9"></div>
              <div className="h-16 w-full bg-slate-200 rounded-sm my-2"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-9 w-9"></div>
              <div className="flex items-center gap-4">
                <span className="h-5 w-5 bg-slate-200 rounded-md"></span>
                <span className="h-5 w-5 bg-slate-200 rounded-md"></span>
                <span className="h-5 w-5 bg-slate-200 rounded-md"></span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-3xl bg-white">
            <div className="flex items-center gap-4">
              <div className="w-9"></div>
              <div className="h-5 w-1/3 bg-slate-200 rounded-sm my-2"></div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-9 w-9 bg-slate-200 rounded-full"></div>
              <div className="basis-[80%] h-8 w-full bg-slate-200 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
