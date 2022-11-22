
function ListItem(props){
	function showDetails(){
		props.showDetails(props.country.id);
	}
	return(
    	<li onClick={showDetails} key={props.country.id}>{props.country.name}</li>
    )
}

function CountriesList(props){
	function showDetails(id){
		props.showDetails(id)
	}
    const listItems = props.countries.map((country) => {
	    return <ListItem key={country.id} country={country} showDetails={showDetails} />
	});
    return(
    	<ul>{listItems}</ul>
    )

} 

function Details(props) {
	function showList(){
		props.showList()
	}
	return (
		<div id="details">
		<h1 id="title">{props.country.name}</h1>
		<ul>
			<li id="capital">{props.country.capital}</li>
			<li id="population">{props.country.population}</li>
		</ul>
		<button onClick={showList}>Go back</button>
		</div>
	);
}
  
class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {showDetails:false, chosenCountry:0, countries:[]}
		this.showDetails = this.showDetails.bind(this);
		this.showList = this.showList.bind(this);
	}
	componentDidMount() {
	    fetch(this.props.url)
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            countries: result
	          });
	        },
	        (error) => {
          		console.log(error)
        	}
	      )
	  }
	showDetails(id){
		this.setState({
			showDetails:true,
			chosenCountry: id
	  });
	}
	showList(){
	  this.setState({
			showDetails:false
	  });
	}

	render(){
		if(this.state.showDetails){
			return(
				<div>
				<Details country = {this.state.countries[this.state.chosenCountry-1]} showList={this.showList}/>
				</div>
			)
		}
		return(
			<div>
			<CountriesList countries = {this.state.countries}  showDetails={this.showDetails} />
			</div>
		)
	}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App url="./data/countries.json"/>);