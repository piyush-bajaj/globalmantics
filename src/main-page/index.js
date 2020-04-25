import React from "react";
import "./main-page.css";
import Header from "./header";
import FeaturedHouse from "./featured-house";
import HouseFilter from "./house-filter";
import SearchResults from "../search-results";
import HouseDetail from "../house";

class App extends React.Component {
  state = {};

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses = () => {
    fetch("/houses.json")
      .then((response) => response.json())
      .then((allHouses) => {
        this.allHouses = allHouses;
        this.determineFeaturedHouses();
        this.determineUniqueCountries();
      });
  };

  filterHouses = (country) => {
    this.setState({ activeHouse: null });
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  };

  determineFeaturedHouses = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    }
  };

  determineUniqueCountries = () => {
    const countries = this.allHouses
      ? Array.from(new Set(this.allHouses.map((h) => h.country)))
      : [];
    countries.unshift("Select");
    this.setState({ countries });
  };

  setActiveHouse = (house) => {
    this.setState({ activeHouse: house });
  };

  render() {
    let activeComponent = null;
    if (this.state.country) {
      activeComponent = (
        <SearchResults
          country={this.state.country}
          filteredHouses={this.state.filteredHouses}
          setActiveHouse={this.setActiveHouse}
        ></SearchResults>
      );
    }
    if (this.state.activeHouse) {
      activeComponent = (
        <HouseDetail house={this.state.activeHouse}></HouseDetail>
      );
    }
    if (!activeComponent) {
      activeComponent = (
        <FeaturedHouse house={this.state.featuredHouse}></FeaturedHouse>
      );
    }
    return (
      <div className="container">
        <Header subtitle="Providing houses world wide"></Header>
        <HouseFilter
          countries={this.state.countries}
          filterHouses={this.filterHouses}
        ></HouseFilter>
        {activeComponent}
      </div>
    );
  }
}

export default App;
