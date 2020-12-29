import RootPage from './RootPage/RootPage';
import WrapperHOC from './HOC/WrapperHOC';

function App() {
  return <WrapperHOC>
           <div>
                <RootPage/>
           </div>
         </WrapperHOC>
}

export default App;
