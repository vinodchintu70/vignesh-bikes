export default function BikeSkeleton() {
  return (
    <div className="card">
      <div className="h-48 skeleton rounded-xl mb-4" />
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="space-y-1.5">
            <div className="h-4 skeleton rounded w-36" />
            <div className="h-3 skeleton rounded w-24" />
          </div>
          <div className="space-y-1.5 text-right">
            <div className="h-5 skeleton rounded w-16" />
            <div className="h-3 skeleton rounded w-10" />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 skeleton rounded w-24" />
          <div className="h-3 skeleton rounded w-20" />
        </div>
        <div className="h-10 skeleton rounded-xl" />
      </div>
    </div>
  )
}
