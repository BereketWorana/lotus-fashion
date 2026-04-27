export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080706]">
      <div className="flex flex-col items-center">
        <div className="text-[#c8973a] text-5xl animate-pulse mb-6">🪷</div>
        <div className="w-12 h-12 border-2 border-[#c8973a]/20 border-t-[#c8973a] rounded-full animate-spin"></div>
        <p className="text-[10px] text-[#c8973a] tracking-[0.3em] uppercase mt-6 animate-pulse">Loading</p>
      </div>
    </div>
  )
}
