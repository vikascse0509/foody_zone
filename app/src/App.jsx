import styled from 'styled-components'
import { useEffect, useState } from 'react';
import SearchResult from './components/SearchResults/SearchResult';
export const BASE_URL = "http://localhost:9000"
const App = () => {
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedButton, setSelectedButton] = useState("all")

  useEffect(() => {
    const fetchFoodData = async () =>{
      setLoading(true)
      try {
        const response = await fetch(BASE_URL)
        const json = await response.json()
        setData(json)
        setFilteredData(json)
        setLoading(false)
      } catch (error) {
        setError("Unable to fetch data")
      }
      
    }
    fetchFoodData();
  },[])

  console.log(data)

  const searchFood = (e) =>{
    const serachValue = e.target.value
    console.log(serachValue)
    if(serachValue == ""){
      setFilteredData(null)
    }
    const filter = data?.filter((food)=> food.name.toLowerCase().includes(serachValue.toLowerCase()))
    setFilteredData(filter)
  }

  const filteredBtns = [
    {
    name : "All",
    type : "all"
  },
  {
    name : "Breakfast",
    type : "breakfast"
  },
  {
    name : "Lunch",
    type : "lunch"
  },
  {
    name : "Dinner",
    type : "dinner"
  },
  ]

  if(error) return <div>{error}</div>
  if (loading) return <div>loading...</div>

  const filteredFood = (type) =>{
    if(type == "all"){
      setFilteredData(data)
      setSelectedButton("all")
      return;
    }
     const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()))
     setFilteredData(filter)
     setSelectedButton(type)
  }

  return (
    <>
     <Container>
        <TopContainer>
          <div className="logo">
            <img src="./foodyzone_logo.png" alt="Foody zone" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder="Search Food" />
          </div>
        </TopContainer>
        <FilterContainer>
          {
            filteredBtns.map((value)=>(<Button isSelected={selectedButton == value.type} key={value.name} onClick={() => filteredFood(value.type)}>{value.name}</Button>))
          }
        </FilterContainer>
     </Container>
     <SearchResult data={filteredData}/>
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search{
    input{
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
    }
  }
  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px; 
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
   background:${({isSelected}) => (isSelected ? "#b71717" : "#ff4343")};
   outline: 1 px solid ${({isSelected}) => (isSelected ? "white" : "#ff4343")};
   border-radius: 5px;
   padding: 6px 12px;
   border: none;
   color: white;
   cursor: pointer;
   &:hover{
    background-color: #b71717;
   }

`;





