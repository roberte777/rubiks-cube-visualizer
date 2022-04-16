import { CubePiece } from "./CubePiece";

const FACE_PIECES = 9

interface Props {
  face: number
  values: number[]
}

export const CubeFace = (props: Props) => {
  // Determine cube indexes by given face value
  const cubeIndexes = (() => {
    return [...Array(9).keys()].map(v => v + (props.face * FACE_PIECES))
  })();

  return (
    <div className="flex flex-col gap-1">
      {/* Top Row*/}
      <div className="flex gap-1">
        <div className="basis-1/3">
          <CubePiece index={cubeIndexes[0]} color={props.values[0]}/>
        </div>
        <div className="basis-1/3">
          <CubePiece index={cubeIndexes[1]} color={props.values[1]}/>
        </div>
        <div className="basis-1/3">
          <CubePiece index={cubeIndexes[2]} color={props.values[2]}/>
        </div>
      </div>

      {/* Center Row */}
      <div className="flex gap-1">
        <div className="basis-1/3">
          <CubePiece index={cubeIndexes[3]} color={props.values[3]}/>
        </div>
        <div className="basis-1/3">
          <CubePiece index={cubeIndexes[4]} color={props.values[4]}/>
        </div>
        <div className="basis-1/3">
          <CubePiece index={cubeIndexes[5]} color={props.values[5]}/>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex gap-1">
        <div className="basis-1/3">
          <CubePiece index={cubeIndexes[6]} color={props.values[6]}/>
        </div>
        <div className="basis-1/3">
          <CubePiece index={cubeIndexes[7]} color={props.values[7]}/>
        </div>
        <div className="basis-1/3">
          <CubePiece index={cubeIndexes[8]} color={props.values[8]}/>
        </div>
      </div>
  </div>
)
}
