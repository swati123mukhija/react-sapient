import React from 'react';
import Filter from './filter';
const List = (props) => {
  const {space} = props;
  if (!space || space.length === 0) return <p>No repos, sorry</p>;
  return (
    <>
    <h1>SpaceX Launch Programs</h1>
    <div className="repo-width">
    <ul>
      {space.map((naru) => {
        return (
          <li key={naru.flight_number} className='flexa prel mb40'>
          <img  src={naru.links.mission_patch_small} className="formbg"/>
          <div>
            <span className='repo-text text-color'>{naru.mission_name}#{naru.flight_number}</span>
            <span className='repo-text'>Mission Ids:<br/> <span>{naru.mission_id}</span></span>
            <span className='repo-text'>Launch Year: <span>{naru.launch_year}</span></span>
            <span className='repo-text'>Sucsessful Launch: <span>{naru.launch_success ? "true" : "false"}</span></span>
            <span className='repo-text'>Sucsessful Landing: <span>{naru.launch_success ? "true" : "false"}</span></span>
            </div>
          </li>
        );
      })}
    </ul>
    </div>
    <div className="filter_style">
    <Filter find = {space}/>
    </div>
    </>
  );
};
export default List;
