

function PaginationBar({ pageRef, totalPages, onPageChange }) {
  const pageButtons = [];
  const handleClickNext = (e) => {
    
  };
  const handleClickPrev = (e) => {
    
  };

  for (let page = 1; page <= totalPages; page++) {
    const props = {
      className: (page===pageRef) ? "chosen-page-btn" : "unchosen-page-btn",
      onClick: (e) => onPageChange(Number(e.target.getAttribute("key"))),
      key: page
    }
    pageButtons.push(<button {...props}>{page}</button>);
  }

  return (
    <div className="pagination-bar">
      <button id="pagination-bar_next" style={{display:pageRef!==1}} onClick={handleClickNext}>
        Next
      </button>
      {pageButtons} 
      <button id="pagination-bar_prev" style={{display:pageRef!==totalPages}} onClick={handleClickPrev}>
        Previous
      </button>
    </div>
  );
}

export default { PaginationBar };


// function CoursesList() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(function getAndRenderCourses() {
//     //--response({page, totalPages, totalItems, itemsPerPage, data: [...])
//     fetch(`http://localhost:3000/json-test/${page}.json`)
//       .then(res => res.json())
//       .then(res => {
//         setTotalPages(res.totalPages);
//         setData(res.data);

//         if (res.currentPage !== page)
//           //--Restore client standing page.
//           setPage(res.currentPage);
//       });
//   }, [page]);

//   return (
//     <div className="courses-list">
//       <table className="courses-data">
//         <thead>
//           <tr>
//             <th className="course-name">Course Name</th>
//             <th className="created-date">Created Date</th>
//             <th className="expired-date">Expired Date</th>
//             <th className="cost">Cost</th>
//             <th className="delete">Delete</th>
//             <th className="update">Update</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map(course =>
//             <tr className="course-row" key={course.id}>
//               <td className="course-name">{course.name}</td>
//               <td className="created-date">{course.createdDate}</td>
//               <td className="expired-date">{course.expiredDate}</td>
//               <td className="cost">{course.cost}</td>
//               <td className="delete" id={course.id} onClick={(e) => { }}><button>Delete</button></td>
//               <td className="update" id={course.id} onClick={(e) => { }}><button>Update</button></td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div className="pagination-bar">
//         <PaginationBar page={page} totalPages={totalPages} changePage={setPage}/>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div key="main-app">
//       <CoursesList />
//     </div>
//   );
// }