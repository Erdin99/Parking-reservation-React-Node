import ParkingService from '../service/parkingSpots'
import ParkingCommentsService from '../service/parkingComments'

const createParkingSpot = async (parkingSpotsDto, parking_image, req, res) => {
    try {
      await ParkingService.createParkingSpot(parkingSpotsDto, parking_image, req.body)
      res.send('Successful created parking spot!')
    } catch (err) {
      console.error(err)
      res.status(400).send()
    }
}

const readAllParkings = async (filter, req, res) => {
  try {
    const parkings = await ParkingService.readAllParkings(filter)
    res.send({ parkings })
  } catch (err) {
    console.log(err)
    res.status(400).send()
  }
}

const readMyList = async (parkingSpotsDto, req, res) => {
  try {
    const myParkings = await ParkingService.readMyList(parkingSpotsDto)
    res.send({ myParkings })
  } catch (err) {
    console.log(err)
    res.status(400).send()
  }
}

const readParkingDetails = async (id, req, res) => {
  try {
    const parkingDetail = await ParkingService.readParkingDetails(id)
    const parkingComments = await ParkingCommentsService.readParkingComments(id)
    res.send({ parkingDetail, parkingComments })
  } catch (err) {
    console.log(err)
    res.status(400).send()
  }
}

const updateParking = async (id, req, res) => {
  try {
    const updatedParking = await ParkingService.updateParking(id, req.body)
    res.send('Successful update!')
  } catch (err) {
    console.log(err)
    res.status(400).send()
  }
}

const deleteParking = async (id, req, res) => {
  try {
    await ParkingService.deleteParking(id)
    res.send('Successful deleted!')
  } catch (err) {
    console.log(err)
    res.status(400).send()
  }
}

export default {
    createParkingSpot,
    readAllParkings,
    readMyList,
    readParkingDetails,
    updateParking,
    deleteParking
}