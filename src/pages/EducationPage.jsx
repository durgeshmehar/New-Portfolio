import { Education, Skills } from "../components";
import Opensource from "../components/Opensource";
import Dsa from "../components/Dsa";

const EducationPage = () => (
  <div className="pt-[100px] pb-[10vh]">
    <Education />
    <Skills />
    <Opensource />
    <Dsa />
  </div>
);

export default EducationPage;
