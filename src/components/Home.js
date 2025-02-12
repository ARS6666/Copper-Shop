import Cat from './home/category';
import Slider from './home/slider';
import Prod from './home/products';
import OFF from './products/Offprdct';


function Home(theme) {
  return (<>
    <Slider theme={theme}/>
    <Cat theme={theme}/>
    <Prod theme={theme}/>
    <div class="col-md-12 col-12 justify-content-end m-0"><OFF theme={theme}/></div>
  </>);
}

export default Home;
