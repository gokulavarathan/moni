import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useSelector} from 'react-redux'
const mapStyles = {
width: "50%",
height: "200%"
};

export class MapContainer extends Component {
constructor(props) {
    super(props);
}





displayMarkers = () => {


    return (
        <Marker
        key={1}
        id={1}
        position={{
            lat: this.props.location.lattitude ,
            lng: this.props.location.langitude
        }}
        onClick={() => console.log("You clicked me!")}
        />
    );
    
};

render() {
    return (
    <div>
        <Map
        google={this.props.google}
        zoom={2}
        style={mapStyles}
        initialCenter={{ lat: localStorage.getItem('lattitude'), lng: localStorage.getItem('langitude') }}
        className="map"
        >
        {this.displayMarkers()}
        </Map>
    </div>
    );
}
}

export default GoogleApiWrapper({apiKey: "AIzaSyBp68RmeQVmhQRdujiPMyfMonea_C483PY"})(MapContainer);
