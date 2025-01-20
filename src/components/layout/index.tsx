import Tabs from "../../reusables/tabs";

// type LayoutMainViewProps = {
//     test: string
//   };

export default function LayoutMainView() {

return (
    <div className="container-fluid">
        <div className="cols col-gapless">

        <Tabs data={[
                { key: 't-1', title: 'Sea Life', content: 'abcde' },
                { key: 't-2', title: 'Dive Sites', content: 'fghij' },
                { key: 't-3', title: 'Partner Requests', content: 'klmno' }
              ]}
              fullWidth
              />
              
        </div>
    </div>

)

}