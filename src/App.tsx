import {
  useEffect,
  useState
} from 'react'
import {
  Cube,
  Presentation,
  State
} from "./components/RubiksCube/Cube/Cube";
import {
  RotateButton
} from "./components/RubiksCube/Cube/RotateButton"

const CUBE_SIZE = 54
const CUBE_ALLOWED_REGEX = /^[A-Za-z0-9]{0,54}$/
const CENTER_PIECES_REGEX = /(\w?){5}(\w?){9}?(\w?){9}?(\w?){9}?(\w?){9}?(\w?){9}?/
const CUBE_CHARSET = "frbludFRBLUD"
const CUBE_SOLVED = '000000000111111111222222222333333333444444444555555555'

export default function App() {
  // Cube parameters
  const [cubeState, setCubeState] = useState<State>()

  // Controlled Components
  const [cubeString, setCubeString] = useState<string>('')
  const [dynamicCenterPieces, setDynamicCenterPieces] = useState<boolean>(true)
  const [cubePresentation, setCubePresentation] = useState<Presentation>(Presentation.HalfUnfolded)
  const [cubeList, setCubeList] = useState<string[]>([])

  // Set cube values from an input string
  const setCube = (inputCubeString: string) => {
    // Reject input that is not alphanumerical
    if (!CUBE_ALLOWED_REGEX.test(inputCubeString)) {
      return;
    }

    // Retain original input in input box
    setCubeString(inputCubeString)

    // Determine numerical values (TODO: This is a slow operation at the moment, toggle disables it)
    let cubeStringNumerical;
    if (dynamicCenterPieces) {
      // Take centerpieces from current input and check for validity
      const centerPieces = CENTER_PIECES_REGEX.exec(inputCubeString)?.slice(1)
      if (typeof centerPieces == 'undefined') {
        return;
      }

      // Map each center value to a number
      const centerMap: { [index: string]: number } = {}
      let count = 0
      for (let piece of centerPieces) {
        centerMap[piece as string] = count++
      }

      // Transform entire string into numerical values mapped from center pieces
      cubeStringNumerical = Array.from(inputCubeString).map(value => {return centerMap[value]})
    } else {
      // TODO: perform non-dynamic center conversion by order of incidence
      cubeStringNumerical = Array.from(inputCubeString).map(value => {return Number.parseInt(value) || 0})
    }

    // Create a cube from numerical input and set cube state
    const cube = {
      0: cubeStringNumerical.slice(0, 9),
      1: cubeStringNumerical.slice(9, 18),
      2: cubeStringNumerical.slice(18, 27),
      3: cubeStringNumerical.slice(27, 36),
      4: cubeStringNumerical.slice(36, 45),
      5: cubeStringNumerical.slice(45, 54),
    }
    setCubeState(cube)
  }

  const setList = (inputCubeString: string) => {
    setCubeList([])
    setCubeList(inputCubeString.split(','))
  }

  // Set the cube to a random solveable state
  const shuffleCube = () => {
    let rotations = ""
    for (let i = 0; i < 50; i++) {
      rotations += CUBE_CHARSET[Math.floor(Math.random() * CUBE_CHARSET.length)];
    }

    fetch(`https://cad0087-rubik.mybluemix.net/api?op=solve&cube=${CUBE_SOLVED}&rotate=${rotations}`)
      .then(response => response.json())
      .then(data => setCube(data.cube));
  }

  // Return a cube to default values
  const resetCube = () => {
    setCube(CUBE_SOLVED)
  }

  // Return a cube to default values
  const rotate = (rotation: string) => {
    fetch(`https://cad0087-rubik.mybluemix.net/api?op=solve&cube=${cubeString}&rotate=${rotation}`)
      .then(response => response.json())
      .then(data => setCube(data.cube));
  }

  // Receive or request cube state on load (TODO: Currently it just sets the cube to default values)
  useEffect(() => {
    resetCube()
    setCubeList([CUBE_SOLVED])
  }, []);

  return (
    <div className="App">
      {/* Parameters Bar */}
      <div className="parameters w-screen flex justify-center">
        <div className="parameters-bar w-auto">
          <input
            className="border-stone-600 border-2 rounded p-1 m-2 mb-0 w-[51rem] text-center caret-blue-500"
            type="text"
            value={cubeString}
            placeholder='Enter numerical cube value...'
            pattern={`[A-Za-z0-9']{${CUBE_SIZE}}`}
            maxLength={CUBE_SIZE+2}
            onChange={(e) => setCube(e.target.value.replace("'", "").replace("'", ""))}
          />
          <br/>
          <button className="border-stone-600 bg-red-400 border-2 rounded p-1 pl-6 pr-6 m-2"  onClick={() => resetCube()}>Reset Cube</button>
          <button className="border-stone-600 bg-yellow-400 border-2 rounded p-1 pl-6 pr-6 m-2 mb-0"  onClick={() => shuffleCube()}>Shuffle Cube</button>
          <div className="border-stone-600 border-2 rounded p-1.5 pl-2 pr-2 m-2 mb-0 w-48 inline" >
            <input type="checkbox" name="dynamicCenterpiecesToggle" checked={dynamicCenterPieces} onChange={(e) => setDynamicCenterPieces(e.currentTarget.checked)}/>
            <label htmlFor="dynamicCenterpiecesToggle"> Dynamic Centerpieces</label>
          </div>
          <div className="border-stone-600 border-2 rounded p-1.5 pl-2 pr-2 m-2 mb-0 w-48 inline" >
            <label htmlFor="cubePresentation">Cube Presentation </label>
            <select
              name="cubePresentation"
              value={cubePresentation.valueOf()}
              onChange={(e) => {
                let selection = e.target.value
                if (selection == '0') {
                  setCubePresentation(Presentation.Unfolded)
                } else if (selection == '1') {
                  setCubePresentation(Presentation.HalfUnfolded)
                } else if (selection == '2') {
                  setCubePresentation(Presentation.Default)
                }
              }}
            >
              <option value="0">Unfolded</option>
              <option value="1">Half-Unfolded</option>
              <option value="2">3D Cube</option>
            </select>
          </div>

        </div>
      </div>

      {/* Controls Section */}
      <div className="p-2 w-[1100px] m-auto mt-16">
        <div className="grid grid-cols-12 gap-4 place-content-evenly">
          <div className="col-span-1 row-span-1 pl-4">
            <svg
              className="h-12 w-12 text-blue-500"
              width="24"
              height="24"
              viewBox="-2 -2 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path
                stroke="none"
                d="M0 0h24v24H0z"/>
              <path
                d="M15 4.55a8 8 0 0 0 -6 14.9m0 -4.45v5h-5"/>
              <path
                d="M13 19.95a8 8 0 0 0 5.3 -12.8"
                strokeDasharray=".001 4.13"/>
            </svg>
            <RotateButton command={"f"} color={0} rotateHandler={rotate}/>
            <RotateButton command={"r"} color={1} rotateHandler={rotate}/>
            <RotateButton command={"b"} color={2} rotateHandler={rotate}/>
            <RotateButton command={"l"} color={3} rotateHandler={rotate}/>
            <RotateButton command={"u"} color={4} rotateHandler={rotate}/>
            <RotateButton command={"d"} color={5} rotateHandler={rotate}/>
          </div>
          <div className="col-span-10 row-span-2">
            {/* Cube Visualizer */}
            <div className="cubePresentation w-[812px] m-auto mt-12">
              {typeof cubeState !== 'undefined' &&
                  <Cube state={cubeState} presentation={cubePresentation}/>
              }
            </div>
          </div>
          <div className="col-span-1 row-span-2 pl-4">
            <svg
              className="h-12 w-12 text-blue-500"
              width="24"
              height="24"
              viewBox="-2 -2 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path
                stroke="none"
                d="M0 0h24v24H0z"/>
              <path
                d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5"/>
              <path
                d="M11 19.95a8 8 0 0 1 -5.3 -12.8"
                strokeDasharray=".001 4.13"/>
            </svg>
            <RotateButton command={"F"} color={0} rotateHandler={rotate}/>
            <RotateButton command={"R"} color={1} rotateHandler={rotate}/>
            <RotateButton command={"B"} color={2} rotateHandler={rotate}/>
            <RotateButton command={"L"} color={3} rotateHandler={rotate}/>
            <RotateButton command={"U"} color={4} rotateHandler={rotate}/>
            <RotateButton command={"D"} color={5} rotateHandler={rotate}/>
          </div>
        </div>
      </div>
      <div className="border p-2 w-[520px] m-auto mt-16 border-stone-500 border rounded-md">
        <p className="font-medium text-base text-sky-600 pb-2 text-center">
          Move List
        </p>

        {/* List of moves */}
        <div className="pl-6 pb-3">
          <select
            className="border rounded-sm border-stone-500 text-sm"
            multiple
            onChange={(e) => setCube(e.currentTarget.selectedOptions[0].text)}
          >
            {cubeList.map((cube: string, i) => {
              return (
                <option
                  key={i}
                  value={i}>{cube}
                </option>
              );
            })
            }
          </select>
        </div>

        <hr/>
        <textarea
          className="border-stone-600 border-2 rounded p-2 m-2 mb-0 w-[485px] text-center caret-blue-500"
          rows={5}
          placeholder={"Paste in a list of cube strings separated by commas (no spaces), then use the arrow keys to navigate through the list of moves. \n\nClick away from the box to set the list of moves."}
          onBlur={(e) => setList(e.target.value)}
        />
      </div>
    </div>
  )
}
