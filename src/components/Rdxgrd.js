import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/emp";
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Sort, Edit, Toolbar, IEditCell, Grid } from '@syncfusion/ej2-react-grids';
import { emp } from "../reducers/emp";
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

//import { ToastProvider, useToasts } from 'react-toast-notifications'

const Emp = ({ ...props }) => {
    useEffect(() => {
        props.fetchAllBooks()
        props.fetchDepList()
    }, [])

    //  const { addToast } = useToasts()


    const columns = [
        { key: "SNo", name: "SNo" },
        { key: "Id", name: "Id" },
        { key: "Name", name: "Name" },
        { key: "Address", name: "Address" },
        { key: "Department", name: "Department" },
        { key: "DOB", name: "DOB" },
    ];

    let row = [];
    props.emplist.map((item, index) => {
        row.push({
            SNo: index + 1,
            Id: item.Id,
            Name: item.Name,
            Address: item.Address,
            Departments: item.Depid,
            Department: item.Depname,
            DOB: item.DOB.toString().substring(0, 10),
        });
    });


    const pageSettings = { pageSize: 10 }
    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true };
    //  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    const toolbarOptions = [
        { text: 'Add' }, { text: 'Edit' }, { text: 'Delete' }, { text: 'Cancel' },
        { text: 'Update All', tooltipText: 'Update All', prefixIcon: 'e-update', id: 'Update All' }
    ];
    const settings = { type: 'Multiple' };
    const selectionOption = {
        checkboxMode: 'ResetOnRowClick',
        enableToggle: true
    };


    let Update = [];

    const onCellValueChanged = payload => {
        const { requestType, data } = payload;

        if (requestType === "save") {
            if (data.Id > 0) {


                var department = props.deplist.filter(el => el.Depname === data.Department);
                const Data = {
                    Id: data.Id,
                    Name: data.Name,
                    Address: data.Address,
                    DOB: data.DOB,
                    Department: department[0].Depid,
                }
                Update.push(Data)
            }
            else {

                var department = props.deplist.filter(el => el.Depname === data.Department);
                const Emp = {
                    Name: data.Name,
                    Address: data.Address,
                    DOB: data.DOB,
                    Department: department[0].Depid,
                }
                Update.push(Emp);
                if (Update.length != 0) {
                    const onSuccess = () => {
                        alert("Updated successfully")
                    }
                    props.updateEmp(Update, onSuccess);
                }


            }

        }
        if (requestType === "delete") {
            const onSuccess = () => {
                alert("Deleted successfully", { appearance: 'success' })
            }
            props.deleteEmp(payload.data[0].Id, onSuccess)
        }
    }

    const clickHandler = (args) => {
        if (args.item.id === 'Update All') {
            console.log(Update);
            if (Update.length != 0) {
                const onSuccess = () => {
                    alert("Updated successfully", { appearance: 'success' })
                }
                props.updateEmp(Update, onSuccess);
            }

        }
    }

    let dateValue = new Date();


    const editTemplatedd = (props) => {
        return (
            <DropDownListComponent id="Department" dataSource={DeptList} fields={fields} index={props.Departments - 1} />
        )
    }

    let DeptList = [];
    props.deplist.map((item, index) => {
        DeptList.push({
            Depid: item.Depid,
            Depname: item.Depname
        });
    });

    const fields = { text: 'Depname', value: 'Depid' };


    const onBatchAdd = payload => {
        const { requestType, batchChanges } = payload;
        let updateData = batchChanges.changedRecords;
        let addData = batchChanges.addedRecords;
        let deleteData = batchChanges.deletedRecords;

        if (payload.batchChanges.changedRecords.length !== 0) {
            props.updateEmp(updateData, () => alert("Update successfully", { appearance: 'info' }));
            alert("Update Successfully")
        }
        if (payload.batchChanges.addedRecords.length !== 0) {
            props.craeteEmp(addData, () => alert("Saved successfully", { appearance: 'info' }));
            alert("Save Successfully")
        }
        if (payload.batchChanges.deletedRecords.length !== 0) {
            props.deleteEmp(deleteData, () => alert("Deleted successfully", { appearance: 'info' }))
        }
    }

    const validationRule = {
        required: true
    };


    return (
        <div>

            <GridComponent
                dataSource={row}
                allowPaging={true}
                pageSettings={pageSettings}
                allowSorting={true}
                editSettings={editOptions}
                toolbar={toolbarOptions}
                selectionSettings={selectionOption}
                actionBegin={onCellValueChanged}
                beforeBatchSave={onBatchAdd}
                rowHeight={50}
                selectionSettings={settings}
                toolbarClick={clickHandler}
            >

                <ColumnsDirective>
                    <ColumnDirective field='Id' textAlign="Center" isPrimaryKey="true" />
                    <ColumnDirective field='Name' validationRules={validationRule} />
                    <ColumnDirective field='Address' validationRules={validationRule} />
                    <ColumnDirective field='Department' editType="dropdownedit" />
                    {/* <ColumnDirective field='Department' editTemplate={editTemplatedd} validationRules={validationRule}/> */}
                    <ColumnDirective field='DOB' editType="datepickeredit" format='MM-dd-yyyy' value={dateValue} validationRules={validationRule} />
                </ColumnsDirective>
                <Inject services={
                    [Page, Sort, Edit, Toolbar]}
                />
            </GridComponent >

        </div>
    );
}

const mapStateToProps = state => ({
    emplist: state.emp.list,
    deplist: state.emp.DepList
})

const mapActionToProps = {
    fetchAllBooks: actions.fetchAll,
    deleteEmp: actions.Delete,
    updateEmp: actions.update,
    fetchDepList: actions.fetchDepList,
    craeteEmp: actions.create
}

export default connect(mapStateToProps, mapActionToProps)(Emp);