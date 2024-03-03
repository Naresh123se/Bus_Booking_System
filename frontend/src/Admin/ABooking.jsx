import React, { useState } from 'react';
import AIndex from './AIndex.jsx'
import { jsx, css } from '@emotion/react'; // Import jsx and css from Emotion
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const CrudTable = () => {
 const [data, setData] = useState([
    { id: 1, startTime: '08:00', endTime: '18:00', startLocation: 'Home', endLocation: 'Office', price: 100 },
    // Add more initial data as needed
 ]);
 const [selectedItems, setSelectedItems] = useState([]);

 const [editIndex, setEditIndex] = useState(null);
 const [editData, setEditData] = useState({});
 const [showAddPanel, setShowAddPanel] = useState(false); // State to manage the visibility of the add panel

 const addData = (newData) => {
    setData([...data, newData]);
    setShowAddPanel(false); // Hide the add panel after adding data
 };

 const updateData = (index, updatedData) => {
    const updatedDataArray = [...data];
    updatedDataArray[index] = updatedData;
    setData(updatedDataArray);
 };

 const deleteData = (index) => {
    const updatedDataArray = [...data];
    updatedDataArray.splice(index, 1);
    setData(updatedDataArray);
 };

 const handleAddSubmit = (event) => {
    event.preventDefault();
    const newData = {
      id: data.length + 1,
      startTime: event.target.startTime.value,
      endTime: event.target.endTime.value,
      startLocation: event.target.startLocation.value,
      endLocation: event.target.endLocation.value,
      price: event.target.price.value,
    };
    addData(newData);
 };

 const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(data[index]);
 };

 const handleEditSubmit = (event) => {
    event.preventDefault();
    updateData(editIndex, {
      ...editData,
      startTime: event.target.startTime.value,
      endTime: event.target.endTime.value,
      startLocation: event.target.startLocation.value,
      endLocation: event.target.endLocation.value,
      price: event.target.price.value,
    });
    setEditIndex(null);
 };

 const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
 };

 const handleDeleteSelected = () => {
    setData(data.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
 };

 return (
    <>
      <div className='flex'>
        <div>
          <AIndex/>
        </div>

        <div className='w-full'>
          <div className="">
            <div className='text-lg font-semibold text-[#fff] bg-[#3583b1]'>
              Booking Schedules
              <button onClick={() => setShowAddPanel(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New</button>
              <button onClick={handleDeleteSelected} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Selected</button>
            </div>
            
            {/* Conditional rendering for the add panel */}
            {showAddPanel && (
              <div className="bg-white p-4 mb-4 ml-5 ">
                <h1 className="text-md font-semibold mb-2">Add New Schedules </h1>
                <form onSubmit={handleAddSubmit} className='flex'>
                  <input type="text" name="startTime" placeholder="Start Time" required className="  shadow-lg   border   bg-[#FFF] shadow-[#b7acac] rounded-md  " />
                  <input type="text" name="endTime" placeholder="End Time" required className="" />
                  <input type="text" name="startLocation" placeholder="Start Location" required className="" />
                  <input type="text" name="endLocation" placeholder="End Location" required className="" />
                  <input type="number" name="price" placeholder="Price" required className="" />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
                </form>
              </div>
            )}

            <table className="min-w-full ">
              {/* Table header */}
              <thead className="">
                <tr className="flex  shadow-lg  mt-1 mb-1 pl-2 pt-1 pb-1          bg-[#FFF] shadow-[#b7acac] rounded-md">
                  <th className="w-1/12">Select</th>
                  <th className="w-1/12">Start Time</th>
                  <th className="w-2/12">End Time</th>
                  <th className="w-2/12">Start Location</th>
                  <th className="w-2/12">End Location</th>
                  <th className="w-2/12">Price</th>
                  <th className="w-1/12">Actions</th>
                </tr>
              </thead>

              {/* Table body */}
              <tbody sx={{ backgroundColor: 'red', padding: '20px' }}>
                {data.map((item, index) => (
                  <tr key={item.id} className="flex p-1 bg-[#f0f0f0]">
                 
                    <td className="w-20 ml-12  ">
                      <input type="checkbox" onChange={(event) => handleCheckboxChange(event, item.id)} />
                    </td>
                    <td className="w-40 ">{item.startTime}</td>
                    <td className="w-2/12">{item.endTime}</td>
                    <td className="w-2/12">{item.startLocation}</td>
                    <td className="w-2/12">{item.endLocation}</td>
                    <td className="w-32">{item.price}</td>
                    <td className=" flex gap-2">
                    
                      <button onClick={() => handleEdit(index)}><EditIcon className='text-[#009DF8] ml-2'/></button>
                      <button onClick={() => deleteData(index)}><DeleteIcon className='text-[red]'/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Edit form */}
            {editIndex !== null && (
              <form onSubmit={handleEditSubmit} className="mt-63">
                <input type="text" name="startTime" defaultValue={editData.startTime} required />
                <input type="text" name="endTime" defaultValue={editData.endTime} required />
                <input type="text" name="startLocation" defaultValue={editData.startLocation} required />
                <input type="text" name="endLocation" defaultValue={editData.endLocation} required />
                <input type="number" name="price" defaultValue={editData.price} required />
                <button type="submit">Save</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
 );
};

export default CrudTable;
