import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { createContract } from '../utils/constants'

export const usekryptok = () => {
  const [contract, setContract] = useState(null)
  const [userAddress, setUserAddress] = useState('')
  const [properties, setProperties] = useState([])

  // Hook to get the account from wagmi
  const { address } = useAccount()




  // UseEffect to set the state of userAddress
  useEffect(() => {
    address && setUserAddress(address)
    console.log('address ', address)
    setContract(createContract())
  }, [address])

  // UseEffect Get all properties
  useEffect(() => {
    getProperties()
    console.log(properties)
  }, [contract])
  // Get Properties function
  const getProperties = async () => {

    if (contract) {
      try {
        const noOfProps = await contract.methods.counter().call()
        setProperties([])
        for (let index = 0; index < noOfProps; index++) {
          const property = await contract.methods.properties(index).call()
          const formattedProperty = {
            id: property['id'],
            name: property['name'],
            description: property['description'],
            pricePerDay: property['pricePerDay'],
            imgUrl:property['imgUrl'],
            isBooked: property['isBooked'],
            address: property['propertyAddress'],
          }
          setProperties(prevState => [...prevState, formattedProperty])
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  // Add Listing function
  const addListing = async (
    name,
    propertyAddress,
    description,
    imgUrl,
    pricePerDay,
  ) => {
    if (contract) {
      try {
        await contract.methods
          .listProperty(name, propertyAddress, description, imgUrl, pricePerDay)
          .send({ from: address, gas: 3000000, gasLimit: null })
          getProperties()
      } catch (error) {
        console.log(error)
      }
    }
  }
  // Book Listing function
const bookProperty=async(id,startAt,endAt)=>{
  if(contract){
    try{
      const duePrice = await contract.methods
      .getDuePrice(id,startAt,endAt)
      .call()
      await contract.methods.bookProperty(id,startAt,endAt).send({
        from:userAddress,
        value:duePrice,
        gas:3000000,
        gasLimit:null,
      })
      getProperties()
    }catch(error){
      console.log(error)
    }
  }
}


  return { properties, userAddress, addListing,bookProperty }
}
