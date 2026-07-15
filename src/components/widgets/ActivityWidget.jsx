import { motion } from "framer-motion"
import { cn } from "@/components/lib/utils"
import { useAppStore } from "@/store/Appstore"
import { GlassSurface } from "@/components/ui/glass-surface"

const activities = [
  {
    label: "MOVE",
    value: 85,
    color: "#FF2D55",
    size: 112,
    current: 479,
    target: 800,
    unit: "CAL",
  },
  {
    label: "EXERCISE",
    value: 60,
    color: "#A3F900",
    size: 84,
    current: 24,
    target: 30,
    unit: "MIN",
  },
  {
    label: "STAND",
    value: 30,
    color: "#04C7DD",
    size: 56,
    current: 6,
    target: 12,
    unit: "HR",
  },
]

const CircleProgress = ({ data, index }) => {
  const strokeWidth = 10
  const radius = (data.size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = ((100 - data.value) / 100) * circumference

  const gradientId = `activity-grad-${data.label.toLowerCase()}`
  const gradientUrl = `url(#${gradientId})`

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
    >
      <svg
        aria-label={`${data.label} Activity Progress - ${data.value}%`}
        className="-rotate-90 transform"
        height={data.size}
        viewBox={`0 0 ${data.size} ${data.size}`}
        width={data.size}
      >
        <title>{`${data.label} Activity Progress - ${data.value}%`}</title>
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={data.color} stopOpacity="1" />
            <stop
              offset="100%"
              stopColor={
                data.color === "#FF2D55"
                  ? "#FF6B8B"
                  : data.color === "#A3F900"
                    ? "#C5FF4D"
                    : "#4DDFED"
              }
              stopOpacity="1"
            />
          </linearGradient>
        </defs>
        <circle
          className="text-white/15"
          cx={data.size / 2}
          cy={data.size / 2}
          fill="none"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          animate={{ strokeDashoffset: progress }}
          cx={data.size / 2}
          cy={data.size / 2}
          fill="none"
          initial={{ strokeDashoffset: circumference }}
          r={radius}
          stroke={gradientUrl}
          strokeDasharray={circumference}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.25))" }}
          transition={{
            duration: 1.5,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  )
}

const DetailedActivityInfo = () => {
  return (
    <div className="flex flex-col justify-center gap-2 min-w-0 flex-1 pl-3">
      {activities.map((activity) => (
        <div className="flex flex-col leading-none" key={activity.label}>
          <span className="text-[9px] font-semibold tracking-wider text-white/55">
            {activity.label}
          </span>
          <span
            className="font-semibold text-[15px] mt-0.5"
            style={{ color: activity.color }}
          >
            {activity.current}/{activity.target}
            <span className="ml-1 text-[10px] font-medium text-white/50">
              {activity.unit}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

export default function ActivityWidget({ className }) {
  useAppStore((state) => state.isDarkMode)

  return (
    <div
      className={cn(
        "relative w-80 h-40 p-3 flex items-center text-white select-none shrink-0 pointer-events-auto overflow-hidden transition-all duration-300 rounded-3xl",
        className
      )}
    >
      <GlassSurface
        tint={0}
        radius={24}
        blur={8}
        chroma={0.3}
        className="absolute inset-0 -z-10"
      />

      <div className="relative z-10 flex items-center w-full h-full">
        <div className="relative h-[112px] w-[112px] shrink-0">
          {activities.map((activity, index) => (
            <CircleProgress
              data={activity}
              index={index}
              key={activity.label}
            />
          ))}
        </div>
        <DetailedActivityInfo />
      </div>
    </div>
  )
}
