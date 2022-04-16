const COLORS = [
  'bg-white-500',
  'bg-cyan-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-red-500'
]

const COLOR_GRADIENTS = [
  'from-zinc-50 to-zinc-200',
  'from-cyan-400 to-cyan-500',
  'from-yellow-400 to-yellow-500',
  'from-green-400 to-green-500',
  'from-orange-400 to-orange-500',
  'from-red-400 to-red-500'
]

// const COLOR_GRADIENTS = [
//   'from-cyan-400 to-cyan-500',
//   'from-red-400 to-red-500',
//   'from-green-400 to-green-500',
//   'from-orange-400 to-orange-500',
//   'from-yellow-400 to-yellow-500',
//   'from-zinc-50 to-zinc-200'
// ]

interface Props {
  index: number
  color: number
}

export const CubePiece = (props: Props) => {
  const color = COLOR_GRADIENTS[props.color]
  return (
    <div className={`bg-gradient-to-r ${color} w-16 h-16 rounded-lg m-auto border-stone-500 border hover:drop-shadow-lg active:border-2`}>
      <div className="w-full h-full m-auto text-center cursor-default select-none">
        {props.index}
      </div>
    </div>
  )
}