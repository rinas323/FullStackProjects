import { useState } from "react";
import { evaluate } from "mathjs";

function Square({
  value,
  setField,
  color = "bg-orange-400",
  field="",
}: {
  value: string;
  setField: (newValue: string | ((prev: string) => string)) => void;
  color?: string;
  field?: string;
}) {
  return (
    <>
      <div>
        <button
          className={`${color} h-[100px] w-[100px]`}
          onClick={() => {
            if(value==="←"){
              setField((prev)=>prev.slice(0,-1));
              return;
            }
            if (value === "=") {
              if (field.length > 0) {
                try{
                const evalString = field
                  ?.replaceAll("÷", "/")
                  .replaceAll("×", "*");
                const num = evaluate(evalString);
                setField(String(num));
                }catch{
                  setField("Error");
                }
                return;
              }
            }
            setField((prev) => (prev += value));
          }}
        >
          {value}
        </button>
      </div>
    </>
  );
}



function App() {
  const [field, setField] = useState<string>("");
  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-violet-500 text-4xl font-bold">Calculator APP</h1>
      </div>
      <div className="flex justify-center items-center w-screen mt-4">
        <input
          className="bg-amber-100 h-[88px] w-[520px] border-4 border-white text-4xl text-center rounded-md"
          type="text"
          value={field}
          readOnly
        />
      </div>
      <div className="flex justify-center gap-1 mt-1.5">
        <Square value="1" setField={setField} />
        <Square value="2" setField={setField} />
        <Square value="3" setField={setField} />
        <Square value="+" setField={setField} color="bg-white" />
        <Square value="←" setField={setField} color="bg-red-500"/>
      </div>
      <div className="flex justify-center items-center gap-1 mt-1.5">
        <Square value="4" setField={setField} />
        <Square value="5" setField={setField} />
        <Square value="6" setField={setField} />
        <Square value="-" setField={setField} color="bg-white" />
        <Square value="(" setField={setField} color="bg-gray-400"/>
      </div>
      <div className="flex justify-center items-center gap-1 mt-1.5">
        <Square value="7" setField={setField} />
        <Square value="8" setField={setField} />
        <Square value="9" setField={setField} />
        <Square value="×" setField={setField} color="bg-white" />
        <Square value=")" setField={setField} color="bg-gray-400"/>
      </div>
      <div className="flex justify-center items-center gap-1 mt-1.5">
        <Square value="0" setField={setField} />
        <Square value="." setField={setField} color="bg-white" />
        <Square value="÷" setField={setField} color="bg-white" />
        <Square value="%" setField={setField} color="bg-white" />
        <Square
          value="="
          setField={setField}
          color="bg-gray-400"
          field={field}
        />
      </div>
    </>
  );
}

export default App;
