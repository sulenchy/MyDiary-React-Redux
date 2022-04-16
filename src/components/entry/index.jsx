import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation, useHistory } from 'react-router-dom';

function index({ entries = [] }) {
  const [showAll, setShowAll] = useState(false);
  const [entryArr, setEntryArr] = useState([]);

  useEffect(() => {
    const history = useHistory();
    console.log('group ===> ', history);
    if (showAll) {
      // get all entries headerText
      const allEntries = [];
      setEntryArr(allEntries);
      return;
    }
    setEntryArr(entries);
  }, []);

  return (
    <>
      <div className="container" style={{ marginTop: '70px' }}>
        <h2>{ showAll ? 'All Entries' : 'Month | Day Year' }</h2>
        <input type="search" className="input-field" id="search" placeholder="Search by title" name="search" />
        <>
          {
           entryArr.length && entryArr.map((element, i) => (
             <div className="card row" key={i}>
               <div className="day">
                 <a href="./entry-content.html">
                   <h2>hr:min:sec</h2>
                 </a>
               </div>
               <div className="entry">
                 <a href="./entry-content.html">
                   <h2>Title of the entry</h2>
                 </a>
               </div>
               <div className="row">
                 <div className="buttons">
                   <div className="container">
                     <a href="#">
                       <i className="fa fa-trash" />
                     </a>
                   </div>
                   <div className="container">
                     <a href="#">
                       <i className="fa fa-edit" />
                     </a>
                   </div>
                 </div>
               </div>
             </div>
           ))
          }
        </>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  entryPayload: state.entryReducer,
  userPayload: state.userReducer
});

export default connect(mapStateToProps, null)(index);
