import ParkingSpotsDAO from '../db/dao/parkingSpots'
import config from '../core/config'


const createParkingSpot = (parkingDto, parking_image, parkingDto1) => {
    const { parking_name, parking_address, number_of_parking_spots, basic_informations, price } = parkingDto1;
    return ParkingSpotsDAO.createParkingSpot(parkingDto.id, parkingDto.username, parkingDto.email, parking_name, parking_address, number_of_parking_spots, basic_informations, price, parking_image);
}

const addParkingImages = (parking_id, imageArray) => {
    return ParkingSpotsDAO.addParkingImages(parking_id, imageArray)
}

const readAllParkings = (filter) => {
    if (filter === config.PARKINGLISTFILTER.randomList) {
        return ParkingSpotsDAO.readAllParkings()
    }
    else if (filter === config.PARKINGLISTFILTER.cheapestToExpensive) {
        return ParkingSpotsDAO.readAllCheapestToExpensiveParkings()
    }
    else if (filter === config.PARKINGLISTFILTER.expensiveToCheapest) {
        return ParkingSpotsDAO.readAllExpensiveToCheapestParkings()
    }
    else if (filter === config.PARKINGLISTFILTER.mostToLeast) {
        return ParkingSpotsDAO.readAllMostToLeastParkingSpaces()
    }
    else if (filter === config.PARKINGLISTFILTER.leastToMost) {
        return ParkingSpotsDAO.readAllLeastToMostParkingSpaces()
    }
}

const readMyList = (parkingDto) => {
    return ParkingSpotsDAO.readMyList(parkingDto.id)
}

const readParkingDetails = (id) => {
    return ParkingSpotsDAO.readParkingDetails(id)
}

const getAllImages = (id) => {
    return ParkingSpotsDAO.getAllImages(id)
}

const updateParking = (id, parkingDto) => {
    const {parking_name, parking_address, number_of_parking_spots, basic_informations, price } = parkingDto
    return ParkingSpotsDAO.updateParking(id, parking_name, parking_address, number_of_parking_spots, basic_informations, price)
}

const deleteParkingImages = (id) => {
    return ParkingSpotsDAO.deleteParkingImages(id)
}

const deleteParkingComments = (id) => {
    return ParkingSpotsDAO.deleteParkingComments(id)
}

const deleteParkingReservations = (id) => {
    return ParkingSpotsDAO.deleteParkingReservations(id)
}

const deleteParking = (id) => {
    return ParkingSpotsDAO.deleteParking(id)
}

export default {
    createParkingSpot,
    addParkingImages,
    readAllParkings,
    readMyList,
    readParkingDetails,
    getAllImages,
    updateParking,
    deleteParkingImages,
    deleteParkingComments,
    deleteParkingReservations,
    deleteParking
}