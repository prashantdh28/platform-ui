import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../Components/Button/ButtonBox";
import { updateRisk } from "../../../redux/Slice/riskManagementApiSlice";
import { formatData, setForm2Data } from "../../../redux/Slice/riskManagementSlice";
import Tabs from "../Tabs/form3Tab";
import useToastify from "../../../Hooks/useToastify";

const Form3 = ({ handleNext, handleBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToastify();
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const { riskProfileData, form2Data } = useSelector((state) => state.risk);
  const { tabData } = useSelector((state) => state.risk);

  // const selectedTableDataArray = ;
  const handleSabmit = (flag, handleClick) => {
      let allData = Object.values(tabData)
          .map((item) => item.selectedTableData)
          .flat();
      const formatFormData = (data) => {
          const formattedData = [];
          data?.forEach((item) => {
              // Find or create the business objective based on "columnName"
              let businessObjective = formattedData?.find((obj) => obj.name === item.columnName);
              if (!businessObjective) {
                  businessObjective = {
                      name: item.columnName,
                      description: "",
                      functions: [],
                  };
                  formattedData?.push(businessObjective);
              }

              // Find or create the function based on "tabName"
              let businessFunction = businessObjective.functions?.find(
                  (func) => func.function === item.tabName
              );

              if (!businessFunction) {
                  businessFunction = {
                      function: item.tabName,
                      type: "CSF",
                      categories: [],
                  };
                  businessObjective.functions?.push(businessFunction);
              }

              // Find or create the category based on "rowName"
              let category = businessFunction.categories?.find((cat) => cat.name === item.rowName);

              if (!category) {
                  category = {
                      name: item.rowName,
                      subcategories: [],
                  };
                  businessFunction.categories?.push(category);
              }

              // Add subcategory
              category.subcategories?.push({
                  id: item.name,
                  selected: item.selected,
                  selection_reason: item.selection_reason,
                  control_status: item.control_status,
                  impact: item.impact,
                  impact_reason: item.impact_reason,
              });
          });

          const merged = formattedData.map((item2) => {
              const matchingData1 = form2Data.find((item1) => item1.name === item2.name);
              if (matchingData1) {
                  return {
                      ...item2,
                      description: matchingData1.description,
                  };
              }
              return item2;
          });

          if (merged?.length > 0) {
              return merged;
          } else {
              return { business_objectives: form2Data, ...riskProfileData };
          }
      };
      dispatch(setForm2Data(formatFormData(allData)));
      const payload = {
          name: riskProfileData.name,
          description: riskProfileData.description,
          department_name: riskProfileData.department_name,
          profile_type: riskProfileData.profile_type,
          source_profile: riskProfileData.source_profile,
          is_public: riskProfileData.is_public,
          business_objectives: formatFormData(allData),
      };

      if (flag) {
          if (id) {
              dispatch(
                  updateRisk(
                      { form_id: 2, status: "DRAFT", ...payload },
                      id,
                      navigate,
                      showToast,
                      "Risk Draft Saved Successfully",
                      true,
                      handleClick
                  )
              );
          }
      } else {
          dispatch(formatData(payload));
          dispatch(
              updateRisk(
                  { form_id: 2, status: "DRAFT", ...payload },
                  id,
                  navigate,
                  showToast,
                  "Risk Profile Updated Successfully",
                  false,
                  handleClick
              )
          );
      }
  };

  return (
      <div id="details" className="form3-main-container">
          <Tabs step={2} />
          <div className="button-padding form1-btn-group">
              <div>
                  <button
                      className="footer-back-btn"
                      onClick={() => {
                          handleSabmit(false, handleBack);
                      }}
                  >
                      BACK
                  </button>
              </div>
              <div className="save-next-btn-group">
                  <button
                      type="button"
                      id="sequrityFramework"
                      className="e-btn e-outline save-btn"
                      style={{
                          borderRadius: "4px",
                          color: BackgroundColor,
                          borderColor: BackgroundColor,
                      }}
                      onClick={() => handleSabmit(true, handleNext)}
                  >
                      SAVE
                  </button>
                  <ButtonComponent
                      label="Next"
                      type="submit"
                      id="sequrityFramework"
                      className="e-btn"
                      onClick={() => handleSabmit(false, handleNext)}
                  />
              </div>
          </div>
      </div>
  );
};

export default Form3;
