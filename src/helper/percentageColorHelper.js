import { COAThreatCoverage } from "../Constants/Constant";

export const getPercentageColor = (value) => {
  if (value <= 25 && value >= 0) {
      return COAThreatCoverage.RED;
  } else if (value <= 50 && value > 25) {
      return COAThreatCoverage.YELLOW;
  } else if (value <= 75 && value > 50) {
      return COAThreatCoverage.LIGHTGREEN;
  } else if (value <= 100 && value > 75) {
      return COAThreatCoverage.DARKGREEN;
  } else {
      return "";
  }
};
