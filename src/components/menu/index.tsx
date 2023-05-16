
function Menu() {
  return (
    <div className='menu'>
      <div>{localStorage.getItem('username')}</div>
      <div>liked</div>
      <div>photos</div>
    </div>
  );
}

export default Menu;
