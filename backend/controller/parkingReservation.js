import ParkingReservationService from '../service/parkingReservation'
import ParkingReservationDAO from '../db/dao/parkingReservation'
import sendEmail from '../controller/sendEmail'
import sendRefusedEmail from './sendRefusedEmail'

const createParkingReservation = async (id, parkingReservationDto, req, res) => {
    try {
      const numberOfFreeSpots = await ParkingReservationDAO.getFreeSpots(id)
      
      if(numberOfFreeSpots.number_of_parking_spots === 0) {
        return res.status(400).send('You cannot reserve a parking space, because everything is full!')
      }  
      const data = await ParkingReservationDAO.getData(id)
      const reservation_parking_name = data.parking_name
      const reservation_parking_address = data.parking_address
      
      const code = (Math.random() + 1).toString(36).substring(4) 
      
      const status = 'Odobreno'  

      const reservation_created_by_id = await ParkingReservationDAO.getId(id)
      
      await ParkingReservationService.createParkingReservation(id, parkingReservationDto, reservation_parking_name, reservation_parking_address, req.body, code, status, reservation_created_by_id.created_by_id)
      
      await ParkingReservationDAO.updateNumberOfParkingSpots(id, (numberOfFreeSpots.number_of_parking_spots-1))
      const email = JSON.parse(JSON.stringify(parkingReservationDto)).email
      sendEmail(email, code)
      
      res.send('Successful created parking reservation!')
    } catch (err) {
      console.error(err)
      res.status(400).send()
    }
}

const refuseReservation = async (id, req, res) => {
    try {
        const data = await ParkingReservationDAO.getParkingIdAndStatus(id)
        const parkingId = data.reservation_parking_id
        const parkingStatus = data.status
        if(parkingStatus === 'Odgodjeno') {
            return res.status(403).send("Cannot refuse, because it's already refused!")
        }
        const numberOfFreeSpots = await ParkingReservationDAO.getNumberOfSpots(parkingId)
        
        const status = 'Odgodjeno'
        
        await ParkingReservationDAO.refuseReservation(status, id)
        
        await ParkingReservationDAO.updateParkingSpots(parkingId, (numberOfFreeSpots.number_of_parking_spots + 1))
        
        res.send('Successful refused!')
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
}

const refuseUsersReservation = async (id, req, res) => {
    try {
        const data = await ParkingReservationDAO.getUserData(id)
        const parkingId = data.reservation_parking_id
        const parkingStatus = data.status
        const email = data.reserved_by_email
        const parkingName = data.reservation_parking_name
        if(parkingStatus === 'Odgodjeno') {
            return res.status(403).send("Cannot refuse, becuase it's already refused!")
        }
        const numberOfFreeSpots = await ParkingReservationDAO.getNumberOfSpots(parkingId)

        const status = 'Odgodjeno'

        await ParkingReservationDAO.refuseUsersReservation(status, id)

        await ParkingReservationDAO.updateParkingSpots(parkingId, (numberOfFreeSpots.number_of_parking_spots + 1))

        sendRefusedEmail(email, parkingName)

        res.send('Successful refused!')
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
}

const finishReservation = async (id, req, res) => {
    try {
        const data = await ParkingReservationDAO.getParkingIdAndStatus(id)
        const parkingId = data.reservation_parking_id
        const parkingStatus = data.status
        if(parkingStatus === 'Zavrseno') {
            return res.status(403).send("Cannot finish, because it's already finished!")
        }
        const numberOfFreeSpots = await ParkingReservationDAO.getNumberOfSpots(parkingId)
        
        const status = 'Zavrseno'
        
        await ParkingReservationDAO.refuseReservation(status, id)
        
        await ParkingReservationDAO.updateParkingSpots(parkingId, (numberOfFreeSpots.number_of_parking_spots + 1))
        
        res.send('Successful finished!')
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
}

const getAllReservationForMyParking = async (parkingReservationDto, req, res) => {
    try {
        const listOfReservationForMyParking = await ParkingReservationService.getAllReservationForMyParking(parkingReservationDto)
        res.send({ listOfReservationForMyParking })
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
}

const getAllRefusedReservationForMyParking = async (parkingReservationDto, req, res) => {
    try {
        const listOfRefusedReservationForMyParking = await ParkingReservationService.getAllRefusedReservationForMyParking(parkingReservationDto)
        res.send({ listOfRefusedReservationForMyParking })
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
}

const getMyReservations = async (parkingReservationDto, req, res) => {
    try {
        const listOfMyReservations = await ParkingReservationService.getMyReservations(parkingReservationDto)
        res.send({ listOfMyReservations })
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
}

const getMyRefusedReservations = async (parkingReservationDto, req, res) => {
    try {
        const listOfMyRefusedReservations = await ParkingReservationService.getMyRefusedReservations(parkingReservationDto)
        res.send({ listOfMyRefusedReservations })
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
}

const getSearchedReservation = async (code, req, res) => {
    try {
        const searchedReservation = await ParkingReservationService.getSearchedReservation(code)
        res.send({searchedReservation})
    } catch(err) {
        console.log(err)
        res.status(400).send()
    }
}

export default {
    createParkingReservation,
    refuseReservation,
    refuseUsersReservation,
    finishReservation,
    getAllReservationForMyParking,
    getAllRefusedReservationForMyParking,
    getMyReservations,
    getMyRefusedReservations,
    getSearchedReservation
}