import React, { useEffect, useState, useRef } from 'react';
import AIndex from './AIndex.jsx'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { toast } from 'react-toastify';
import { useGetBlogMutation, useEditBlogMutation, useDeleteBlogMutation, useAddBlogMutation } from '../slices/blog.js';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import JoditEditor from 'jodit-react';

const Blog = () => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [blogText, setBlogText] = useState('');
    const [author, setAuthor] = useState('');

    const editor = useRef(null);


    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({});
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    // Hook
    const [addBlog] = useAddBlogMutation();
    const [getBlog] = useGetBlogMutation();
    const [deleteBlog] = useDeleteBlogMutation();
    const [editBlog] = useEditBlogMutation();




    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    const fetchData = async () => {
        try {
            const result = await getBlog();
            const newData = result.data.data;

            console.log("Original data:", newData); // Log the original data
            // Create a copy of the newData array and then reverse it
            const reversedData = [...newData].reverse();
            console.log("Reversed data:", reversedData); // Log the reversed data
            // Set the reversed data in the state
            setData(reversedData);


        } catch (error) {
            console.error('Failed to fetch schedules:', error);
        }
    };

    const truncateText = (text, words) => {
        const wordArray = text.split(' ');
        const truncatedText = wordArray.slice(0, words).join(' ');
        return truncatedText + (wordArray.length > words ? '...' : ''); // Add ellipsis if text is truncated
    };


    const handleImageChange = (e) => {
        11
        const files = Array.from(e.target.files);

        setSelectedImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setSelectedImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    //submit @add
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        selectedImages.forEach((image, index) => {
            data.append(`selectedImages[${index}]`, image);
        });
        // data.append('place', place);

        try {

            const response = await addBlog({ title, category, author, blogText, selectedImages });
            console.log(response);
            if (response.data.success) {
                console.log("first")
                toast.success('Blog added Successfully');
                setShowAddPanel(false);
                fetchData();
                // Reset form fields or state after successful submission
                // setPlace('');
                setSelectedImages([]);
            } else {
                console.log("first")
                toast.error('Failed to add Blog' || error.message);
            }
        } catch (error) {

            toast.error(error.message || 'An error occurred while adding the Blog');
        }
    };

    //delete 
    const deleteData = async (id) => {
        try {
            console.log("ID:", id); // Check the value of id
            const response = await deleteBlog(id); // Assuming deleteSchedule accepts ID as a parameter

            if (response.error) {
                throw new Error(response.error.message || 'Failed to delete Blog');
            }
            setData(data.filter(item => item._id !== id));
            toast.success('Blog deleted successfully');
        } catch (error) {
            console.error('Failed to delete Blog:', error);
            toast.error(error.message || 'Failed to delete Blog');
        }
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleEdit = (index) => {
        setEditIndex(index);
        console.log(editIndex);
        setEditData(data[index]);
        setOpenEditDialog(true);
    };


    const handleUpdate = (newContent) => {
        // Perform the update operation here, such as saving to the database
        console.log('Updated content:', newContent);
        // You can also update the state if needed
        setEditData((prevData) => ({
            ...prevData,
            blogText: newContent,
        }));
    };

    const handleEditSubmit = async () => {
        try {
            console.log('editData:', editData); // Log editData to check its value
            const response = await editBlog({ id: editData._id, data: editData });

            console.log('Response:', response);
            console.log(editData);
            if (!response || !response.data || !response.data.data) {
                throw new Error('Invalid response format');
            }

            const updatedData = [...data];
            updatedData[editIndex] = response.data.data;
            setData(updatedData);

            setOpenEditDialog(false);
            setEditData({});
            setEditIndex(null);

            toast.success('Schedule updated successfully');
        } catch (error) {
            console.error('Failed to update schedule:', error);
            toast.error(error?.data?.message || error.message);
        }
    };


    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setSelectedItems([...selectedItems, id]);
        } else {
            setSelectedItems(selectedItems.filter(item => item !== id));
        }
    };


    const handleDeleteSelected = async () => {
        try {
            if (selectedItems.length === 0) {
                throw new Error('Please select at least one item to delete.');
            }

            // Loop through each selected item and delete it
            await Promise.all(selectedItems.map(async (id) => {
                const response = await deleteBlog(id);
                if (response.error) {
                    throw new Error(response.error.message || 'Failed to delete schedule');
                }
            }));

            // Remove deleted items from the data array
            setData(data.filter(item => !selectedItems.includes(item._id)));

            // Clear selected items
            setSelectedItems([]);

            // Clear checkboxes
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => checkbox.checked = false);

            toast.success('Selected schedules deleted successfully');
        } catch (error) {
            console.error('Failed to delete schedules:', error);
            toast.error(error.message || 'Failed to delete schedules');
        }
    };




    const navigate = useNavigate();



    return (
        <>
            <div className='flex   overflow-hidden w-full'>
                <div>
                    <AIndex />
                </div>

                <div className='  w-full'>
                    <div style={{}}>
                        <div className='text-lg font-semibold text-[#fff] bg-[#3583b1] pl-10 pt-2 pb-2 flex justify-between'>
                          Blog  
                          <div className='mr-40'>
                          <Button onClick={() => setShowAddPanel(true)} className="  " sx={{ marginLeft: '100vh' }}>Add New</Button>
                            <Button onClick={handleDeleteSelected} className="" sx={{ marginLeft: '10px' }}>Delete Selected</Button>
                          </div>
                           
                        </div>
                        {showAddPanel && (
                            <div className="bg-white ml-10">
                                <div className='flex justify-between'>

                                    <h1 className='text-lg'>Add Blog</h1>
                                   <button className='mr-5' onClick={() => setShowAddPanel(false)}><CancelOutlinedIcon sx={{color:'red'}}/></button> 
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col ">

                                    <div className='flex gap-5 mt-1'>

                                        <div>

                                            <label className="pb-2">
                                                Title <span className="text-[#df3030]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="place"
                                                value={title}
                                                className="mt-1 w-40  block  px-3 h-[35px] border border-[#adabab] rounded-md focus:outline-none focus:ring-[red] focus:border-[#009DF8] "
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Pokhara...."
                                            />
                                        </div>
                                        <div>

                                            <label className="pb-2">
                                                Category <span className="text-[#df3030]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="place"
                                                value={category}
                                                className="mt-1 w-40 block  px-3 h-[35px] border border-[#adabab] rounded-md focus:outline-none focus:ring-[red] focus:border-[#009DF8] "
                                                onChange={(e) => setCategory(e.target.value)}
                                                placeholder="Category...."
                                            />
                                        </div>
                                        <div>

                                            <label className="pb-2">
                                                Category <span className="text-[#df3030]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="place"
                                                value={author}
                                                className="mt-1 w-40 block  px-3 h-[35px] border border-[#adabab] rounded-md focus:outline-none focus:ring-[red] focus:border-[#009DF8] "
                                                onChange={(e) => setAuthor(e.target.value)}
                                                placeholder="Author...."
                                            />
                                        </div>

                                        <div className=" ">
                                            <label className="pb-2  w-40 block">
                                                Images <span className="text-[#df3030]">*</span>
                                            </label>

                                            <input
                                                className='w-52'
                                                type="file"
                                                name="photos"
                                                id="upload"
                                                multiple
                                                onChange={handleImageChange}
                                            />

                                            <br />
                                            <div className="w-full flex items-center flex-wrap">
                                                {selectedImages.map((i, index) => (
                                                    <img
                                                        src={i}
                                                        key={index}
                                                        alt=""
                                                        className="h-[120px] w-[120px] object-cover m-2"
                                                    />
                                                ))}
                                            </div>


                                        </div>

                                        <div className='w-96'>
                                            <JoditEditor
                                                ref={editor}
                                                value={blogText}
                                                tabIndex={1} // tabIndex of textarea
                                                onBlur={newContent => setBlogText(newContent)} // preferred to use only this option to update the content for performance reasons
                                                onChange={(e) => setBlogText(e.target.value)}

                                            />
                                        </div>
                                        <div className='mt-4'>
                                            <Button className='' onClick={handleSubmit}>Upload</Button>
                                        </div>
                                    </div>
                                </form>
                                {console.log(blogText)}


                            </div>
                        )}

                        <div>
                            <table className="min-w-full   ">
                                <thead className="">
                                    <tr className="flex  shadow-lg  mt-1 mb-1 pl-2 pt-1 pb-1 bg-[#FFF] shadow-[#b7acac] rounded-md overflow-hidden">
                                        <th className="w-1/12">Select</th>
                                        <th className="w-1/12">Image </th>

                                        <th className="w-2/12">Title</th>
                                        <th className="w-2/12">Place</th>
                                        <th className="w-2/12">Author</th>
                                        <th className="w-2/12">Des</th>

                                    </tr>
                                </thead>

                                <tbody className='  ' style={{ backgroundColor: '#ffcccc', padding: '20px', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                    <div className='h-[78.5vh]  overflow-y-auto  w-full'>

                                        {data.map((item, index) => (
                                            <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} className='flex'>
                                                <td className=" flex w-28 ml-12 items-center">
                                                    <input type="checkbox" onChange={(event) => handleCheckboxChange(event, item._id)} />
                                                </td>

                                                {/* <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}>{item.selectedImages.url}</td> */}

                                                <td className="w-2/12" style={{ fontSize: '1.2rem', color: '#555' }}>{item.title}</td>
                                                <td className="w-2/12" style={{ fontSize: '1.2rem', color: '#555' }}>{item.category}</td>
                                                <td className="w-60" style={{ fontSize: '1.2rem', color: '#555' }}>{item.author}</td>

                                                {item.selectedImages.map((image, index) => (
  <React.Fragment key={index}>
    <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}></td>
    <td className="w-36">
      <img src={image.url} style={{ height: '50px' }} alt="Image" />
    </td>
  </React.Fragment>
))}

                                            
                                                    <td className="w-36" style={{ fontSize: '1.2rem', color: '#555' }}>
                                                        {typeof item.blogText === 'string' ? (
                                                            <div dangerouslySetInnerHTML={{ __html: `<div>${truncateText(item.blogText, 6)}</div>` }} />
                                                        ) : (
                                                            item.blogText
                                                        )}
                                                    </td>
                                              





                                                <td className="flex gap-2  items-center">
                                                    <button style={{ backgroundColor: '#009DF8', border: 'none', borderRadius: '4px', padding: '8px', cursor: 'pointer' }} onClick={() => handleEdit(index)}><EditIcon className='text-white ml-2' /></button>
                                                    <button style={{ backgroundColor: '#ff6666', border: 'none', borderRadius: '4px', padding: '8px', cursor: 'pointer' }} onClick={() => deleteData(item._id)}><DeleteIcon className='text-white' /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </div>
                                </tbody>


                            </table>
                        </div>

                    </div>
                </div>
            </div>

            {/* edit */}
            <Dialog className='' open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle className='text-center '>Edit Schedule</DialogTitle>
                <DialogContent >
                    <form className='flex flex-col gap-4 mt-2 '>
                        <TextField label="Title" type='text' name="title" value={editData.title} onChange={handleEditInputChange} className='mb-3' />
                        <TextField label="Category" type='text' name="category" value={editData.category} onChange={handleEditInputChange} className='mb-3' />
                        <TextField label="Author" type='text' name="author" value={editData.author} onChange={handleEditInputChange} className='mb-3' />
                        <JoditEditor
                            ref={editor}
                            value={editData.blogText}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={handleUpdate}// preferred to use only this option to update the content for performance reasons
                        // onChange={handleEditInputChange}

                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={handleEditSubmit}>Save</Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default Blog;      
