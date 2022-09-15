import ParkingService from '../service/parkingSpots'
import ParkingCommentsService from '../service/parkingComments'
import ParkingSpotsDAO from '../db/dao/parkingSpots'

const createParkingSpot = async (parkingSpotsDto, parking_image, req, res) => {
    try {
      await ParkingService.createParkingSpot(parkingSpotsDto, parking_image, req.body)
      res.send('Successful created parking spot!')
    } catch (err) {
      console.log(err)
      res.status(400).send()
    }
}

const addParkingImages = async (imageArray, req, res) => {
  try {
    const parkingId = await ParkingSpotsDAO.getParkingId(imageArray[0])
    await ParkingService.addParkingImages(parkingId, imageArray)
  } catch (err) {
    console.log(err)
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

const getAllImages = async (id, req, res) =>  {
  try {
    const parkingImages = await ParkingService.getAllImages(id)
    res.send({ parkingImages })
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
    await ParkingService.deleteParkingImages(id)
    await ParkingService.deleteParking(id)
    res.send('Successful deleted!')
  } catch (err) {
    console.log(err)
    res.status(400).send()
  }
}

export default {
    createParkingSpot,
    addParkingImages,
    readAllParkings,
    readMyList,
    readParkingDetails,
    getAllImages,
    updateParking,
    deleteParking
}