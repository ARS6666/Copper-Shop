import Cat from './home/category';
import Example from './home/slider';
import Prod from './home/products';
import OFF from './products/Offprdct';


function Home(theme) {
  return (<>
    <Example />
    <Cat theme={theme}/>
    <Prod theme={theme}/>
    <div class="coll-md-12 col-12 justify-content-end m-0"><OFF theme={theme}/></div>
  </>);
}

export default Home;
