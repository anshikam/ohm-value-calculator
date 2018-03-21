class ResistorBand extends React.Component {
    constructor(props) {
        super(props);
    }

    getClass() {
        return "resistor-band " + this.props.classNameValue;
    }
    render() {
        return <div className={this.getClass()} style={{background: this.props.color.hex}}>
               </div>
    }
}

//style={{marginLeft: this.props.margin + 'px'}}