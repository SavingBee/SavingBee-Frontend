// StepArrow.tsx
import { RiArrowDropRightFill } from "react-icons/ri";

const StepArrow = () => (
  <div className="flex items-center">
    <RiArrowDropRightFill size={21} color="#E0E0E0" className="mr-[-15px]" />
    <RiArrowDropRightFill size={21} color="#ccc" className="mr-[-15px]" />
    <RiArrowDropRightFill size={21} color="#999" />
  </div>
);
export default StepArrow;