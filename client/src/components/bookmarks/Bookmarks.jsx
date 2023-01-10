import React from 'react'
import { useSelector } from 'react-redux';

const Bookmarks = () => {
  const bookmarks = useSelector((state) => state.bookmarks);

  return (
    <div>
        <h2>Bookmarks</h2>
        <ul>
            {bookmarks.map(bookmark => <li>{bookmark.title}</li>)}
        </ul>        
    </div>
  )
}

export default Bookmarks;