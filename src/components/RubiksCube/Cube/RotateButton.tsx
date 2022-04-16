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
      className={`bg-gradient-to-r ${COLOR_GRADIENTS[props.color]} w-14 h-14 rounded-lg border-stone-500 border hover:drop-shadow-lg active:border-2 mt-6`}
      onClick={() => props.rotateHandler(props.command)}
    >
      <div className="cursor-default select-none text-xl font-bold align-middle text-center font-['Ubuntu_Mono'] pt-3">
        {props.command}
      </div>
    </div>
  )
}