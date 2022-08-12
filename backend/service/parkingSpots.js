import ParkingSpotsDAO from '../db/dao/parkingSpots'

const createParkingSpot = (parkingDto, parkingDto1) => {
    const { parking_name, parking_address, number_of_parking_spots, basic_informations, price } = parkingDto1;
    return ParkingSpotsDAO.createParkingSpot(parkingDto.id, parkingDto.username, parkingDto.email, parking_name, parking_address, number_of_parking_spots, basic_informations, price);
}

const readAllParkings = () => {
    return ParkingSpotsDAO.readAllParkings()
}

const readMyList = (parkingDto) => {
    return ParkingSpotsDAO.readMyList(parkingDto.id)
}

const readParkingDetails = (id) => {
    return ParkingSpotsDAO.readParkingDetails(id)
}

const updateParking = (id, parkingDto) => {
    const {parking_name, parking_address, number_of_parking_spots, basic_informations } = parkingDto
    return ParkingSpotsDAO.updateParking(id, parking_name, parking_address, number_of_parking_spots, basic_informations)
}

const deleteParking = (id) => {
    return ParkingSpotsDAO.deleteParking(id)
}

export default {
    createParkingSpot,
    readAllParkings,
    readMyList,
    readParkingDetails,
    updateParking,
    deleteParking
}