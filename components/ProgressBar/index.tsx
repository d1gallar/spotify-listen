import { paddingNum } from "@/util/util";

type ProgressBarProps = {
  current: number;
  max: number;
};

export default function ProgressBar(props: ProgressBarProps) {
  const calculatedWidth = (props.current / props.max) * 100;
  const formatCurrent = paddingNum(props.current);
  const formatMax = paddingNum(props.max);
  
  return (
    <div className="flex flex-row justify-center items-center">
      <span className="font-circular font-semibold tracking-tight">{formatCurrent}</span>
      <div className="h-0.5 w-10 m-3 bg-[#00000014] rounded-[3px]">
        <div
          className="h-full bg-black rounded-[3px] transition-all duration-500 ease"
          style={{ width: calculatedWidth + "%" }}
        ></div>
      </div>
      <span className="font-circular font-semibold tracking-tight">{formatMax}</span>
    </div>
  );
}
