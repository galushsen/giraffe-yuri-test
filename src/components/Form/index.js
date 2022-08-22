
function Form({ changeHandler }) {

  return (
    <div className='Form'>
      <h4>Setbacks:</h4>

      <label htmlFor='front'>Front</label>
      <input type='number' name='front' min='0' onChange={changeHandler('front')}/>
      
      <label htmlFor='side'>Side</label>
      <input type='number' name='side' min='0' onChange={changeHandler('side')}/>
      
      <label htmlFor='rear'>Back</label>
      <input type='number' name='rear' min='0' onChange={changeHandler('rear')}/>

      <div className="divider"/>
      
      <label htmlFor='maxheight'>Max Height</label>
      <input type='number' name='maxheight' min='0' onChange={changeHandler('maxheight')}/>
    </div>
  );
}

export default Form;
