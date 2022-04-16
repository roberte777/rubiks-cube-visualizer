import {
  COLOR_GRADIENTS
} from "./CubePiece"

interface Props {
  command: string
  color: number
  rotateHandler: any
}

export const RotateButton = (props: Props) => {
  return (
    <div
      className={`bg-gradient-to-r ${COLOR_GRADIENTS[props.color]} w-auto h-14 rounded-lg border-stone-500 border hover:drop-shadow-lg active:border-2`}
      onClick={() => props.rotateHandler(props.command)}
    >
      <div className="cursor-default select-none text-2xl font-black align-middle text-center font-mono pt-3">
        {props.command}
      </div>
    </div>
  )
}