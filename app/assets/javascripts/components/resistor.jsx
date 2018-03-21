class Resistor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          classMap: { 1: 'one', 2: 'two', 3: 'three', 4: 'four' },
          dropdownColors: [
              {   name: "1st Digit",
                  class: "one",
                  colors: [{name: "Brown", hex: "#8B4513"}, {name: "Red", hex: "#FF0000"}, {name: "Orange", hex: "#FF4500"},
                      {name: "Yellow", hex: "#FFFF00"}, {name: "Green", hex: "#228B22"}, {name: "Blue", hex: "#1E90FF"},
                      {name: "Violet", hex: "#663399"}, {name: "Gray", hex: "#D3D3D3"}, {name: "White", hex: "#FFFFFF"}]
              },
              {
                  name: "2nd Digit",
                  class: "two",
                  colors: [{name: "Black", hex: "#000000"}, {name: "Brown", hex: "#8B4513"}, {name: "Red", hex: "#FF0000"},
                      {name: "Orange", hex: "#FF4500"}, {name: "Yellow", hex: "#FFFF00"}, {name: "Green", hex: "#228B22"},
                      {name: "Blue", hex: "#1E90FF"}, {name: "Violet", hex: "#663399"}, {name: "Gray", hex: "#D3D3D3"},
                      {name: "White", hex: "#FFFFFF"}]
              },
              {
                  name: "Multiplier",
                  class: "three",
                  colors: [{name: "Black", hex: "#000000"}, {name: "Brown", hex: "#8B4513"}, {name: "Red", hex: "#FF0000"},
                      {name: "Orange", hex: "#FFFF00"}, {name: "Yellow", hex: "#FFD700"}, {name: "Green", hex: "#228B22"},
                      {name: "Blue", hex: "#1E90FF"}, {name: "Violet", hex: "#663399"}, {name: "Gray", hex: "#D3D3D3"},
                      {name: "White", hex: "#FFFFFF"}, {name: "Gold", hex: "#FFD700"}, {name: "Silver", hex: "#C0C0C0"}
                  ]
              },
              {
                  name: "Tolerance",
                  class: "four",
                  colors: [{name: "Brown", hex: "#8B4513"}, {name: "Red", hex: "#FF0000"},
                      {name: "Orange", hex: "#FFFF00"}, {name: "Yellow", hex: "#FFD700"}, {name: "Green", hex: "#228B22"},
                      {name: "Blue", hex: "#1E90FF"}, {name: "Violet", hex: "#663399"}, {name: "Gray", hex: "#D3D3D3"},
                      {name: "Gold", hex: "#FFD700"}, {name: "Silver", hex: "#C0C0C0"}
                  ]
              },
          ],
          bandColor:  [{name: "Brown", hex: "#8B4513"}, {name: "Black", hex: "#000000"},
              {name: "Black", hex: "#000000"}, {name: "Brown", hex: "#8B4513"} ],
          calculations: {Resistance: '', Tolerance: '', Minimum: '', Maximum: ''}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCalculate = this.handleCalculate.bind(this);
        this.renderData = this.renderData.bind(this);
        this.renderCalculations = this.renderCalculations.bind(this);
    }

    renderBand(i) {
        return <ResistorBand
            classNameValue={this.state.classMap[i+1]} color={this.state.bandColor[i]} />;
    }

    renderCalculations(){
        var component = [];
        $.each(this.state.calculations,function(key, value) {
            component.push(<div id={key} className="calculation">{key} : {value} </div>);
        });
        return component;
    }

    handleChange(event) {
        var element = event.currentTarget;
        var elemClass = element.className;
        var classIndex = {one: 1, two: 2, three: 3, four: 4}
        var index = classIndex[elemClass]-1;

        var color = element.value;
        const bandColor = this.state.bandColor.slice();
        bandColor[index] = this.state.dropdownColors[index].colors[color];
        this.setState({bandColor: bandColor});
    }

    handleCalculate(event) {
        $.post({url: '/calculate', data: {colors: this.state.bandColor.map(function(band){ return band.name }) }}, this.renderData);
    }

    renderData(response) {
        this.setState({calculations: response});
    }

    render() {
        return <div className="resistor-container">
              <div className="resistor">
                <div className="resistor-line"></div>
                <div className="resistor-box">
                  {this.renderBand(0)}
                  {this.renderBand(1)}
                  {this.renderBand(2)}
                  {this.renderBand(3)}
                </div>
                <div className="resistor-line"></div>
              </div>
              <div className="color-picker">
                  <div className= "dropdown">
                      <label>1st Digit</label>
                      <select onChange={this.handleChange} className="one" >
                        {this.state.dropdownColors[0].colors.map(function (color, index) {
                            return <option value={index}>{color.name}</option>;
                        })}
                      </select>
                  </div>
                  <div className= "dropdown">
                      <label>2nd Digit</label>
                      <select onChange={this.handleChange} className="two" >
                          {this.state.dropdownColors[1].colors.map(function (color, index) {
                              return <option value={index}>{color.name}</option>;
                          })}
                      </select>
                  </div>
                  <div className= "dropdown">
                      <label>Multiplier</label>
                      <select onChange={this.handleChange} className="three" >
                          {this.state.dropdownColors[2].colors.map(function (color, index) {
                              return <option value={index}>{color.name}</option>;
                          })}
                      </select>
                  </div>
                  <div className= "dropdown">
                      <label>Tolerance</label>
                      <select onChange={this.handleChange} className="four" >
                          {this.state.dropdownColors[3].colors.map(function (color, index) {
                              return <option value={index}>{color.name}</option>;
                          })}
                      </select>
                  </div>
                  <div>
                      <button type="button" onClick={this.handleCalculate}>Calculate</button>
                  </div>
              </div>
              <div className="results">
                  {this.renderCalculations()}
              </div>
            </div>
    }
}