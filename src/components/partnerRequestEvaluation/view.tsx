import MapLoader from '../googleMap';

export default function PartnerRequestEvalView() {
    return (
        <form
            onSubmit={() => {}}
            className="cols col-12 mt-2 flex-column full-height"
        >
            <div style={{ height: '70vh', width: '100%' }}>
                <MapLoader />
            </div>
        </form>
    );
}
