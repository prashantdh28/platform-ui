import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../Components/Button/ButtonBox";
import SpinnerLoader from "../Components/Loader/SpinnerLoader";
import { useDebouncedValue } from "../Hooks/useDebouncedValue";
import { getAllRisk, addRisk } from "../redux/Slice/riskManagementApiSlice";
import { reSetData } from "../redux/Slice/riskManagementSlice";
import Card from "./Components/RiskCard/Card";
import SearchBar from "../Components/Searchbar/Searchbar"
import "./riskManagement.css";

const RiskManagement = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { riskData, loading, riskAllData } = useSelector((state) => state.riskApi);
    const [filterData, setFilterData] = useState([])
    const [page, setpage] = useState(0)
    const [searchValue, setSearchvalue] = useState("");
    const debouncedValueDeparment = useDebouncedValue(searchValue, 500);

    // remove old data into store
    useEffect(() => {
        dispatch(reSetData())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllRisk(page))
    }, [page, dispatch])


    useEffect(() => {
        setFilterData(riskAllData)
    }, [riskAllData])

    //filter data set
    useEffect(() => {
        if (debouncedValueDeparment !== "") {
            const filtereddata = riskAllData?.filter((item) => item?.department_name?.toLowerCase()?.includes(debouncedValueDeparment?.toLowerCase()))
            setFilterData(filtereddata)
        } else {
            setFilterData(riskAllData)
        }
    }, [debouncedValueDeparment, riskAllData])


    //filter department wise
    const handelDepartmentChange = (e) => {
        setSearchvalue(e.target.value)
    }

    const onLoadMore = () => {
        setpage((prev) => prev + 1)
    }

    return (
        <>
            <div className="main-container">
                <div className="dropdown-container">
                    <div className="partication1">
                        <div>
                        <SearchBar
                            id="custom-search-label"
                           label="Search"
                            className="custom-searchbar"
                            onchange={handelDepartmentChange}
                            width="220px"
                            height="55px"
                          />
                        </div>
                    </div>
                    <div className="partication2">
                    <ButtonComponent
                            label={"+ NEW"}
                            onClick={() =>dispatch(addRisk({form_id: 0}, navigate))}
                            className="risk-new-button"
                        />
                    </div>
                </div>
                <div className="card-container">
                    {filterData?.map((data, index) => {
                        return (
                            <div className="control-panel" key={index}>
                            <Card data={data} filterData={filterData} setFilterData={setFilterData}  setpage={setpage}/>
                            </div>
                        )
                    })}
                </div>
                {!riskData?.last ? (
                    <>
                        {loading ? (
                            <SpinnerLoader className={page !== 0 ? "spineer-loader" : ""} />
                        ) : (
                            <span className="load-more" onClick={onLoadMore}>
                                Load More
                                <span
                                    className="e-icons e-chevron-down-thin"
                                    style={{ fontSize: "small" }}
                                ></span>
                            </span>
                        )}
                    </>
                ) : ("")}
                {filterData?.length < 1 && !loading && <p className="risk-no-data">No Data Found</p>}
            </div>
        </>
    );
};

export default RiskManagement;
