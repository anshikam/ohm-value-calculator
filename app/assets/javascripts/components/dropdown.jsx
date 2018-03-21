class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.currentTarget.value);
        this.props.optionState = event.currentTarget.value;
        console.log(this.props.optionState);
        this.props.onChange();
    }

    render() {
        return <div className="dropdown">
                <label>{this.props.label}</label>
                <select onChange={this.handleChange}>
                    {this.props.colors.map(function(color, index){
                        return <option value={index}>{color.name}</option>;
                    })}
                </select>
              </div>
    }
}

//style={{marginLeft: this.props.margin + 'px'}}