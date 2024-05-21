import React from 'react';
import Swal from 'sweetalert2';

const ConfirmDeletion = () => {
  React.useEffect(() => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default ConfirmDeletion;
