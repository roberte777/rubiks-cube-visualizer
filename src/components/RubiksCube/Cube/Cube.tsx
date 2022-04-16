import { CubeFace } from "./CubeFace";

enum Face {
  Front,
  Right,
  Back,
  Left,
  Up,
  Down
}

export interface State {
  [index: number]: number[]
}

export enum Presentation {
  Unfolded,
  HalfUnfolded,
  Default
}

interface Props {
  state: State
  presentation: Presentation
}

export const Cube = (props: Props) => {
  return (
    <>
      {
        (props.presentation == Presentation.Default && <CubeDefault {...props} />) ||
        (props.presentation == Presentation.HalfUnfolded && <CubeHalfUnfolded {...props} />) ||
        (props.presentation == Presentation.Unfolded && <CubeUnfolded {...props} />)
      }
    </>
  )
}

/** Presents a three-dimensional view of the cube */
const CubeDefault = (props: Props) => {
  return (
    <div className="grid grid-cols-24 gap-1">
      {/* Central Cube View */}
      <div className="col-start-7 col-span-6 origin-bottom -skew-x-[45deg] scale-y-[49%]">
        <CubeFace face={Face.Up} values={props.state[Face.Up]}/>
      </div>
      <div className="col-start-7 col-span-6">
        <CubeFace face={Face.Front} values={props.state[Face.Front]}/>
      </div>
      <div className="col-start-13 col-span-3 origin-left -skew-y-[45deg] scale-x-[49%]">
        <CubeFace face={Face.Right} values={props.state[Face.Right]}/>
      </div>
    </div>
  )
}

/** Presents a three-dimensional view of the cube, but with obscured parts unfolded for visibility. */
const CubeHalfUnfolded = (props: Props) => {
  return (
    <div className="grid grid-cols-24 gap-1">
      {/* Top Row*/}
      <div className="col-start-7 col-span-6 origin-bottom -skew-x-[45deg] scale-y-[49%]">
        <CubeFace face={Face.Up} values={props.state[Face.Up]}/>
      </div>

      {/* Middle Row */}
      <div className="col-start-1 col-span-6">
        <CubeFace face={Face.Left} values={props.state[Face.Left]}/>
      </div>
      <div className="col-start-7 col-span-6">
        <CubeFace face={Face.Front} values={props.state[Face.Front]}/>
      </div>
      <div className="col-start-13 col-span-3 origin-left -skew-y-[45deg] scale-x-[49%]">
        <CubeFace face={Face.Right} values={props.state[Face.Right]}/>
      </div>
      <div className="col-start-16 col-span-6 -translate-y-[98px]">
        <CubeFace face={Face.Back} values={props.state[Face.Back]}/>
      </div>

      {/* Bottom Row */}
      <div className="col-start-7 col-span-6">
        <CubeFace face={Face.Down} values={props.state[Face.Down]}/>
      </div>
    </div>
  )
}

/** Presents a two-dimensional view of the cube */
const CubeUnfolded = (props: Props) => {
  return (
    <div className="grid grid-cols-24 gap-1">
      {/* Top Row*/}
      <div className="col-start-7 col-span-6">
        <CubeFace face={Face.Up} values={props.state[Face.Up]}/>
      </div>

      {/* Middle Row */}
      <div className="col-start-1 col-span-6">
        <CubeFace face={Face.Left} values={props.state[Face.Left]}/>
      </div>
      <div className="col-start-7 col-span-6">
        <CubeFace face={Face.Front} values={props.state[Face.Front]}/>
      </div>
      <div className="col-start-13 col-span-6">
        <CubeFace face={Face.Right} values={props.state[Face.Right]}/>
      </div>
      <div className="col-start-19 col-span-6">
        <CubeFace face={Face.Back} values={props.state[Face.Back]}/>
      </div>

      {/* Bottom Row */}
      <div className="col-start-7 col-span-6">
        <CubeFace face={Face.Down} values={props.state[Face.Down]}/>
      </div>
    </div>
  )
}