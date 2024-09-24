// @components/BulkActions.js
"use client"

const BulkActions = () => {
    const handleBulkDelete = () => {
      // Logic to delete selected orders
      console.log("Bulk delete triggered");
    };
  
    return (
      <div className="flex items-center mb-4">
        <button
          onClick={handleBulkDelete}
          className="bg-red-500 text-white p-2 rounded"
        >
          Delete Selected
        </button>
      </div>
    );
  };
  
  export default BulkActions;
  