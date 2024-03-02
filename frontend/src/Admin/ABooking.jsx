import React, { useState } from 'react';
import AIndex from './AIndex.jsx'

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


  < >

<div className='flex  '  >
<div>
<AIndex/>
</div>





<div className='w-full'>
    <div className=" ">

     <div className=' border bg-hover'>
      Booking Schedules
     </div>
      <button onClick={() => setShowAddPanel(true)} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New</button>
      <button onClick={handleDeleteSelected} className="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Selected</button>

      {/* Conditional rendering for the add panel */}
      {showAddPanel && (
        <div className="bg-white p-4 mb-4 ">
          <h2 className="text-lg font-semibold mb-2">Add New Entry</h2>
          <form onSubmit={handleAddSubmit} className='flex'>
            <input type="text" name="startTime" placeholder="Start Time" required className="mb-2 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
            <input type="text" name="endTime" placeholder="End Time" required className="mb-2 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
            <input type="text" name="startLocation" placeholder="Start Location" required className="mb-2 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
            <input type="text" name="endLocation" placeholder="End Location" required className="mb-2 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
            <input type="number" name="price" placeholder="Price" required className="mb-2 p-2 block w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
          </form>
        </div>
      )}

      <table className="min-w-full divide-y divide-gray-200 gap-x-11">
        {/* Table header */}
        <thead className="bg-gray-50 gap-96">
          <tr>
            <th>Select</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Start Location</th>
            <th>End Location</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.id}>
              <td><input type="checkbox" onChange={(event) => handleCheckboxChange(event, item.id)} /></td> {/* Checkbox added */}
              <td>{item.startTime}</td>
              <td>{item.endTime}</td>
              <td>{item.startLocation}</td>
              <td>{item.endLocation}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => deleteData(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit form */}
      {editIndex !== null && (
        <form onSubmit={handleEditSubmit} className="mt-4">
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
